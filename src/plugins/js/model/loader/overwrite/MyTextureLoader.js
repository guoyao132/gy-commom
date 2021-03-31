/**
 * @author mrdoob / http://mrdoob.com/
 */

import { RGBAFormat, RGBFormat } from 'three' //'../constants.js';
import { ImageLoader } from 'three';
import { Texture } from 'three';
import { Loader } from 'three';

function MyTextureLoader( manager ) {

  Loader.call( this, manager );

}

MyTextureLoader.prototype = Object.assign( Object.create( Loader.prototype ), {

  constructor: MyTextureLoader,

  load: function ( url, onLoad, onProgress, onError ) {

    var texture = new Texture();

    var loader = new ImageLoader( this.manager );
    loader.setCrossOrigin( this.crossOrigin );
    loader.setPath( this.path );

    let img = loader.load( url, function ( image ) {

      texture.image = image;

      // JPEGs can't have an alpha channel, so memory can be saved by storing them as RGB.
      var isJPEG = url.search( /\.jpe?g($|\?)/i ) > 0 || url.search( /^data\:image\/jpeg/ ) === 0;

      texture.format = isJPEG ? RGBFormat : RGBAFormat;
      texture.needsUpdate = true;

      if ( onLoad !== undefined ) {

        onLoad( texture );

      }

    }, onProgress, onError );
    texture.image = img;
    return texture;

  }

} );


export { MyTextureLoader };
