/**
 * WordPress dependencies
 */
const { test, expect } = require( '@wordpress/e2e-test-utils-playwright' );

test.describe( 'Block list view', () => {
	test.beforeAll( async ( { requestUtils } ) => {
		await requestUtils.activateTheme( 'emptytheme' );
	} );

	test.afterAll( async ( { requestUtils } ) => {
		await requestUtils.activateTheme( 'twentytwentyone' );
	} );

	test( 'Should open by default', async ( { page, pageUtils } ) => {
		await pageUtils.visitSiteEditor( {
			postId: 'emptytheme//index',
			postType: 'wp_template',
		} );

		// Should display the Preview button.
		await expect(
			page.locator( '.edit-site-editor__list-view-panel' )
		).not.toBeVisible();

		// Turn on block list view by default.
		await page.evaluate( () => {
			window.wp.data
				.dispatch( 'core/preferences' )
				.set( 'core/edit-site', 'showListViewByDefault', true );
		} );

		await page.reload();

		// Should display the Preview button.
		await expect(
			page.locator( '.edit-site-editor__list-view-panel' )
		).toBeVisible();
	} );
} );
