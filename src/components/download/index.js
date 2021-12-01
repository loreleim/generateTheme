import React from 'react';
import style from "./index.module.scss";
import * as JSZip from 'jszip';
import { saveAs } from 'file-saver';

export default function DownloadButton(props) {

  var headerphp =
`<!DOCTYPE html>
<html <?php language_attributes(); ?>>

<head>
    <?php /* Meta Tags */ ?>    
    <?php include(locate_template('library/components/metadata/metadata.php')); ?>
   
    <?php /* Header Output Hook */ ?> 
    <?php wp_head(); ?>
</head>

<?php /* Opening Body Tag */ ?>
<body <?php body_class(); ?>
`

  var indexphp =
`<?php get_header(); ?>
	
<main class="${props.themeNameProp}-content">
    <?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
      <?php the_content() ?>
    <?php endwhile; endif; ?>
</main>
  
<?php get_footer(); ?>`

  var stylecss =
`/*
* Theme Name: ${props.themeNameProp}
* Author: ${props.authorProp}
* Description: ${props.descriptionProp}
* Version: 0.1.0
*/

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}`

  var footerphp =
`<?php?>

<?php /* Scripts */ ?>
<div>
	<?php /* WP Footer Scripts */ ?>
	<?php wp_footer(); ?>
</div>

</body>
</html>
`
  var defaultPage = 
`<?php /* Template Name: Example Page */ ?>
<?php get_header(); ?>


Is there a pagename?
<?php 
if ( get_query_var('pagename') ) {
    // If so echo the value
    echo get_query_var('pagename');
}
?>

<?php get_footer(); ?>`

  var defaultPosttype = 
`<?php 

// Register Custom Post Type
function custom_posttype_test() {

  $labels = array(
    'name'                => _x( 'Tests', 'Post Type General Name', 'text_domain' ),
    'singular_name'       => _x( 'Test', 'Post Type Singular Name', 'text_domain' ),
    'menu_name'           => __( 'Tests', 'text_domain' ),
    'parent_item_colon'   => __( 'Parent Test:', 'text_domain' ),
    'all_items'           => __( 'All Tests', 'text_domain' ),
    'view_item'           => __( 'View Test', 'text_domain' ),
    'add_new_item'        => __( 'Add New Test', 'text_domain' ),
    'add_new'             => __( 'Add New', 'text_domain' ),
    'edit_item'           => __( 'Edit Test', 'text_domain' ),
    'update_item'         => __( 'Update Test', 'text_domain' ),
    'search_items'        => __( 'Search Test', 'text_domain' ),
    'not_found'           => __( 'Not found', 'text_domain' ),
    'not_found_in_trash'  => __( 'Not found in Trash', 'text_domain' ),
  );

  $rewrite = array(
    'slug'                => 'tests',
    'with_front'          => true,
    'pages'               => true,
    'feeds'               => true,
  );

  $args = array(
    'label'               => __( 'Tests', 'text_domain' ),
    'description'         => __( 'Test Type Description', 'text_domain' ),
    'labels'              => $labels,
    'supports'            => array( 'title','editor', 'custom-fields'),
    'taxonomies'          => array(),
    'hierarchical'        => false,
    'public'              => true,
    'show_ui'             => true,
    'show_in_menu'        => true,
    'show_in_nav_menus'   => true,
    'show_in_admin_bar'   => true,
    'menu_position'       => 5,
    'menu_icon'           => 'dashicons-format-video',
    'can_export'          => true,
    'has_archive'         => false,
    'publicly_queryable'  => true,
    'show_in_rest'      => true,
    'rewrite'             => $rewrite,
    'capability_type'     => 'post'
  );

  register_post_type( 'test', $args );

}

// Hook into the 'init' action
add_action( 'init', 'custom_posttype_test', 0 );
?>
`

  function generateZip() {
    var zip = new JSZip();

    /*MAIN DIRECTORY*/
    //index.php
    zip.file("index.php", indexphp);

    //style.scss
    zip.file("style.css", stylecss)
    
    //footer.php
    zip.file("footer.php", footerphp)

    //header.php
    zip.file("header.php", headerphp)

    /*LIBRARY FOLDER*/

    //library dir
    var libraryFolder = zip.folder("library");

    //posttypes dir
    var posttypesFolder = libraryFolder.folder("posttypes");
    posttypesFolder.file("posttype_test.php", defaultPosttype);

    /*PAGES FOLDER*/

    //pages dir
    var folder2 = zip.folder("pages");

    //page-default.php
    folder2.file("page-default.php", defaultPage);

    zip.generateAsync({type:"blob"})
    .then((content) => {
    saveAs(content, `${props.themeNameProp}.zip`);
    });
  }

  return (
    <React.Fragment>
      <button className={style.downloadButton} onClick={()=> generateZip()}>Download Theme</button>
    </React.Fragment>
  );
}