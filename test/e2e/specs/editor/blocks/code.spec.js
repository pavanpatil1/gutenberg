/**
 * WordPress dependencies
 */

const { test, expect } = require( '@wordpress/e2e-test-utils-playwright' );

test.describe( 'Code', () => {
	test.beforeEach( async ( { admin } ) => {
		await admin.createNewPost();
	} );

	test( 'can be created by three backticks and enter', async ( {
		editor,
		page,
	} ) => {
		await page.click( 'role=button[name="Add default block"i]' );
		await page.keyboard.type( '```' );
		await page.keyboard.press( 'Enter' );
		await page.keyboard.type( '<?php' );

		// Check the content
		const content = await editor.getEditedPostContent();
		expect( content ).toBe(
			`<!-- wp:code -->
<pre class="wp-block-code"><code>&lt;?php</code></pre>
<!-- /wp:code -->`
		);
	} );

	test( 'should delete block when backspace in an empty code', async ( {
		editor,
		page,
	} ) => {
		await editor.insertBlock( { name: 'core/code' } );

		await page.keyboard.type( 'a' );

		await page.keyboard.press( 'Backspace' );
		await page.keyboard.press( 'Backspace' );

		// Expect code block to be deleted.
		expect( await editor.getEditedPostContent() ).toBe( '' );
	} );

	test( 'should paste plain text', async ( { editor, page, pageUtils } ) => {
		await editor.insertBlock( { name: 'core/code' } );

		// Test to see if HTML and white space is kept.
		await pageUtils.setClipboardData( { plainText: '<img />\n\t<br>' } );

		await pageUtils.pressKeyWithModifier( 'primary', 'v' );

		// Check the content
		const content = await editor.getEditedPostContent();
		expect( content ).toBe(
			`<!-- wp:code -->
<pre class="wp-block-code"><code>&lt;img />
	&lt;br></code></pre>
<!-- /wp:code -->`
		);
	} );
} );
