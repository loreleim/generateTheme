import React from 'react';
import style from "./index.module.scss";
import * as JSZip from 'jszip';
import { saveAs } from 'file-saver';

export default function DownloadButton(props) {

  var headerphp =
`<!DOCTYPE html>
<html <?php language_attributes(); ?>

<head>
    <?php /* Meta Tags */ ?>    
    <?php include(locate_template('library/components/ol-metadata/ol-metadata.php')); ?>
   
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
* Author: Lorelei M.
* Description: A wordpress theme starter
* Version 0.1.0
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

  function generateZip() {
    console.log(props.themeNameProp)
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
    var folder1 = zip.folder("library");

    //blocks dir
    var blocksFolder = folder1.folder("blocks");
    blocksFolder.file("Hello.txt", "Hello World\n");

    //blocks - gutenberg block templates

    //pages - where you put ACF templates
    var folder2 = zip.folder("pages");
    folder2.file("Hello.txt", "Hello World\n");

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