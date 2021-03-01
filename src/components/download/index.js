import React from 'react';
import style from "./index.module.scss";
import * as JSZip from 'jszip';
import { saveAs } from 'file-saver';

export default function DownloadButton(props) {

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

  function generateZip() {
    console.log(props.themeNameProp)
    var zip = new JSZip();

    //index.php
    zip.file("index.php", indexphp);

    //style.scss
    zip.file("style.css", stylecss)

    //library
    var folder1 = zip.folder("library");
    folder1.file("Hello.txt", "Hello World\n");

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