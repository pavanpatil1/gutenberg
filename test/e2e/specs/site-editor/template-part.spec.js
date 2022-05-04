/**
 * WordPress dependencies
 */
const {
	test,
	expect,
	Editor,
} = require( '@wordpress/e2e-test-utils-playwright' );

test.use( {
	editor: async ( { page }, use ) => {
		await use( new Editor( { page, isIframe: true } ) );
	},
} );

test.describe( 'Template Part', () => {
	test.beforeAll( async ( { requestUtils } ) => {
		await requestUtils.activateTheme( 'emptytheme' );
		await requestUtils.deleteAllTemplates( 'wp_template' );
		await requestUtils.deleteAllTemplates( 'wp_template_part' );
	} );

	test.afterEach( async ( { requestUtils } ) => {
		await requestUtils.deleteAllTemplates( 'wp_template' );
		await requestUtils.deleteAllTemplates( 'wp_template_part' );
	} );

	test.afterAll( async ( { requestUtils } ) => {
		await requestUtils.activateTheme( 'twentytwentyone' );
	} );

	test( 'shows changes in a template when a template part is modified', async ( {
		admin,
		editor,
		page,
	} ) => {
		const paragraphText = 'Header Template Part 123';

		await admin.visitSiteEditor( {
			postId: 'emptytheme//header',
			postType: 'wp_template_part',
		} );

		// Edit the header.
		await editor.insertBlock( { name: 'core/paragraph' } );
		await page.keyboard.type( paragraphText );

		await editor.saveSiteEditorEntities();

		await admin.visitSiteEditor( {
			postId: 'emptytheme//index',
			postType: 'wp_template',
		} );

		const paragraph = await editor.canvas.locator(
			`p >> text="${ paragraphText }"`
		);

		await expect( paragraph ).toBeVisible();
	} );

	test.only( 'can detach blocks from a template part', async ( {
		admin,
		editor,
		page,
	} ) => {
		const paragraphText = 'Header Template Part 456';

		// Edit the header and save the changes.
		await admin.visitSiteEditor( {
			postId: 'emptytheme//header',
			postType: 'wp_template_part',
		} );

		await editor.insertBlock( { name: 'core/paragraph' } );
		await page.keyboard.type( paragraphText );
		await editor.saveSiteEditorEntities();

		// Visit the index.
		await admin.visitSiteEditor( {
			postId: 'emptytheme//index',
			postType: 'wp_template',
		} );

		const canvas = editor.canvas;

		// Check that the header contains the paragraph added earlier.
		const paragraphSelector = `p >> text="${ paragraphText }"`;
		const paragraph = await canvas.locator( paragraphSelector );
		const headerTemplatePart = await canvas.locator(
			`header[data-type="core/template-part"] >> ${ paragraphSelector }`
		);
		await expect( paragraph ).toBeVisible();

		// Detach the blocks.
		const templatePartClientId = await headerTemplatePart.getAttribute(
			'data-block'
		);
		await editor.selectBlockByClientId( templatePartClientId );
		await canvas.clickBlockOptionsMenuItem(
			'Detach blocks from template part'
		);

		// The paragraph should still be present, but the template part is no
		// longer there.
		await expect( paragraph ).toBeVisible();
		await expect( headerTemplatePart ).not.toBeVisible();
	} );
} );
