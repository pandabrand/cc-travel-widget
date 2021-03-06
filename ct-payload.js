(function(global) {
  attachAndCreate();

  function attachAndCreate() {
    let cc_info = document.getElementById('cc-info');
    let cc_data_city = cc_info.dataset.ccCity;
    if(!cc_info || !cc_data_city) {
      return;
    } else {
      let cc_url = 'https://www.collidetravel.com/cc-city/'.concat(cc_data_city);
      $.ajax({
        type: 'GET',
        url: cc_url,
        success: function(response) {
          let city = response.cities[0];

          city_coord = city.location;


          //create location scoller
          // let location_scroller_div = document.createElement('div');
          // location_scroller_div.className = 'cc-flex-item cc-body location-wrapper';
          // location_scroller_div.id = 'cc-location-wrapper-id';
          // cc_info.appendChild(location_scroller_div);

          //create map title div and text
          let map_title_div = document.createElement('div');
          map_title_div.className = 'cc-header cc-scroll-header';
          let map_title_text = document.createTextNode(city.displayName);
          map_title_div.appendChild(map_title_text);
          cc_info.appendChild(map_title_div);

          //make location table
          let locations = response.locations;
          marker_locations = locations;
          if(locations) {
            let artists = response.artists;
            let comments = response['artist-comments'];

            let locations_div = document.createElement('div');
            locations_div.className = 'cc-location-table';
            for(let x = 0; x < locations.length; x++) {
              let location = locations[x];
              let location_row = document.createElement('div');
              location_row.className = 'cc-location-table-row';
              location_row.id = location._id;

              // let location_image_div = document.createElement('div');
              // location_image_div.className = 'cc-location-image-div cc-flex-item-image';
              // location_image = $.cloudinary.image(location.photo, {cloud_name: 'hjoyay5gd', width:'auto', dpr:'auto', responsive_placeholder: 'blank'});
              // $(location_image_div).append(location_image);
              // location_row.appendChild(location_image_div);

              let location_text_div = document.createElement('div');
              location_text_div.className = 'cc-location-text-div cc-flex-item-text';
              location_row.appendChild(location_text_div);

              let location_title_div = document.createElement('div');
              location_title_div.className = 'cc-location-table-row-title cc-small-header';
              let location_title = document.createTextNode(location.name);
              location_title_div.appendChild(location_title);
              location_text_div.appendChild(location_title_div);

              let artists_with_location = _.filter(artists, function(a) {
                return _.includes(a.locationIds, location._id);
              });

              if(artists_with_location) {
                let artists_with_location_count = artists_with_location.length;
                if(artists_with_location_count > 0) {
                  let recommend_div = document.createElement('div');
                  recommend_div.className = 'cc-callout-div cc-small-text';
                  recommend_div.appendChild(document.createTextNode('Recommended by'));
                  location_text_div.appendChild(recommend_div);
                }
                for(let y = 0; y < artists_with_location_count; y++) {
                  let artist = artists_with_location[y];
                  let comment = _.find(comments, {locationId: locations._id, artistId: artist._id});
                  let location_artist_comment_link = document.createElement('a');
                  location_artist_comment_link.href = 'https://www.collidetravel.com/city/'+city.cityName+'/artist/'+artist.artistSlug;
                  location_artist_comment_link.target = '_blank';
                  location_artist_comment_link.className = 'cc-link';
                  if(comment) {
                    let comment_str = artist.artistName + ' says:<br/>' + comment;
                    location_artist_comment_link.innerHTML = comment_str;
                  } else {
                    location_artist_comment_link.appendChild(document.createTextNode(artist.artistName));
                  }

                  let location_artist_comment_div = document.createElement('div');
                  location_artist_comment_div.className = 'cc-location-table-row-comment';
                  location_artist_comment_div.appendChild(location_artist_comment_link);
                  location_text_div.appendChild(location_artist_comment_div);
                }
              }

              let location_desc_div = document.createElement('div');
              location_desc_div.className = 'cc-location-table-row-desc';
              location_desc_div.innerHTML = location.description;
              location_text_div.appendChild(location_desc_div);

              let location_flex_wrap = document.createElement('div');
              location_flex_wrap.className = 'cc-flex-wrap';
              location_row.appendChild(location_flex_wrap);

              let location_addr_div = document.createElement('div');
              location_addr_div.className = 'cc-location-table-row-addr cc-small-text cc-flex-item-76';
              let location_addr = document.createTextNode(location.address);
              location_addr_div.appendChild(location_addr);
              location_flex_wrap.appendChild(location_addr_div);

              let location_links_div = document.createElement('div');
              location_links_div.className = 'cc-location-table-row-links cc-flex-item-22 cc-small-text';
              let direction_div = document.createElement('div');
              direction_div.className = 'map-links';
              let direction_div_anchor = document.createElement('a');
              direction_div_anchor.href = 'https://www.google.com/maps/dir/Current+Location/'+location.location.lat+','+location.location.lng;
              direction_div_anchor.target = '_blank';
              direction_div_anchor.className = 'cc-link';
              let direction_div_text = document.createTextNode('Directions');
              // let direction_div_icon = document.createElement('i');
              // direction_div_icon.className = 'fa fa-map-o';
              direction_div_anchor.appendChild(direction_div_text);
              // direction_div_anchor.appendChild(direction_div_icon);
              direction_div.appendChild(direction_div_anchor);
              location_links_div.appendChild(direction_div);

              let web_div = document.createElement('div');
              web_div.className = 'map-links';
              let web_div_anchor = document.createElement('a');
              web_div_anchor.href = location.website;
              web_div_anchor.target = '_blank';
              web_div_anchor.className = 'location-website cc-link';
              let web_div_text = document.createTextNode('Website');
              // let web_div_icon = document.createElement('i');
              // web_div_icon.className = 'fa fa-laptop';
              web_div_anchor.appendChild(web_div_text);
              // web_div_anchor.appendChild(web_div_icon);
              web_div.appendChild(web_div_anchor);
              location_links_div.appendChild(web_div);
              location_flex_wrap.appendChild(location_links_div);

              cc_info.appendChild(location_row);

            }
          }

          //make footer
          let footer_div = document.createElement('div');
          footer_div.className = 'cc-footer';

          let footer_text_div = document.createElement('div');
          footer_text_div.className = 'cc-footer-text';
          let footer_str = '<p>Find even more at <a href="https://www.collidetravel.com/" target="_blank">Collide Travel</a></p>';
          footer_text_div.innerHTML = footer_str;
          footer_div.appendChild(footer_text_div);
          cc_info.appendChild(footer_div);

        }
      });
    }
  }


})();// hi there

let city_coord,marker_locations;
