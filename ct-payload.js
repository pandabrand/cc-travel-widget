(function(global) {
  attachAndCreate();

  function attachAndCreate() {
    let cc_info = document.getElementById('cc-info');
    let cc_data_city = cc_info.dataset.ccCity;
    if(!cc_info || !cc_data_city) {
      return;
    } else {
      let cc_url = 'http://www.collidetravel.com/cc-city/'.concat(cc_data_city);
      $.ajax({
        type: 'GET',
        url: cc_url,
        success: function(response) {
          let city = response.cities[0];

          city_coord = city.location;
          $.cloudinary.config({ cloud_name: 'hjoyay5gd', api_key: '423165144988876'});

          //make title
          // let header_div = document.createElement('div');
          // header_div.className = 'cc-header';
          //
          // let header_img_div = document.createElement('div');
          // header_img_div.className = 'cc-header-silver-image';
          // let header_img = document.createElement('img');
          // header_img.src = 'http://collidetravel.com/images/flat-logo-inline-white-250px.png';
          // header_img_div.appendChild(header_img);

          let header_title_div = document.createElement('div');
          header_title_div.className = 'flex-item cc-header-item cc-header-title';
          let header_img_link = document.createElement('a');
          header_img_link.href = 'http://collidetravel.com/';
          header_img_link.target = '_blank';

          let header_img = document.createElement('img');
          header_img.src = 'http://collidetravel.com/images/new-logo-inverse.png';
          header_img_link.appendChild(header_img);
          header_title_div.appendChild(header_img_link);
          // header_title_div.appendChild(document.createTextNode('Collide Travel Guide:'));

          let header_text_div = document.createElement('div');
          header_text_div.className = 'flex-item cc-header-item cc-header-text';
          header_link = document.createElement('a');
          header_link.href = 'http://collidetravel.com/city/'+city.cityName;
          header_link.target = '_blank';
          header_link.appendChild(document.createTextNode(city.displayName));
          let header_title_element = document.createElement('h3');
          header_title_element.appendChild(document.createTextNode('Collide Travel Guide:'));
          header_text_div.appendChild(header_title_element);
          header_text_div.appendChild(header_link);
          // header_div.appendChild(header_img_div);
          // header_div.appendChild(header_title_div);
          // header_div.appendChild(header_text_div);
          // cc_info.appendChild(header_div);
          cc_info.appendChild(header_title_div);
          cc_info.appendChild(header_text_div);

          //create location scoller
          let location_scroller_div = document.createElement('div');
          location_scroller_div.className = 'flex-item cc-body location-wrapper';
          location_scroller_div.id = 'cc-location-wrapper-id';
          cc_info.appendChild(location_scroller_div);

          //create map title div and text
          let map_title_div = document.createElement('div');
          map_title_div.className = 'cc-map-title';
          let map_title_text = document.createTextNode(city.displayName);
          map_title_div.appendChild(map_title_text);
          location_scroller_div.appendChild(map_title_div);

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

              let location_image_div = document.createElement('div');
              location_image_div.className = 'cc-location-image-div flex-item-image';
              location_image = $.cloudinary.image(location.photo, {cloud_name: 'hjoyay5gd', width:150, dpr:'2.0'});
              console.dir(location_image);
              $(location_image_div).append(location_image);
              location_row.appendChild(location_image_div);

              let location_text_div = document.createElement('div');
              location_text_div.className = 'cc-location-text-div flex-item-text';
              location_row.appendChild(location_text_div);

              let location_title_div = document.createElement('div');
              location_title_div.className = 'cc-location-table-row-title';
              let location_title = document.createTextNode(location.name);
              location_title_div.appendChild(location_title);
              location_text_div.appendChild(location_title_div);

              let artists_with_location = _.filter(artists, function(a) {
                return _.includes(a.locationIds, location._id);
              });

              if(artists_with_location) {
                for(let y = 0; y < artists_with_location.length; y++) {
                  let artist = artists_with_location[y];
                  let comment = _.find(comments, {locationId: locations._id, artistId: artist._id});
                  let location_artist_comment_link = document.createElement('a');
                  location_artist_comment_link.href = 'http://collidetravel.com/city/'+city.cityName+'/artist/'+artist.artistSlug;
                  location_artist_comment_link.target = '_blank';
                  if(comment) {
                    let comment_str = artist.artistName + ' says:<br/>' + comment;
                    location_artist_comment_link.innerHTML = comment_str;
                  } else {
                    location_artist_comment_link.appendChild(document.createTextNode(artist.artistName + ' Recommends'));
                  }

                  let location_artist_comment_div = document.createElement('div');
                  location_artist_comment_div.className = 'cc-location-table-row-comment';
                  location_artist_comment_div.style = 'box-shadow: 1px 1px 2px 0px ' + artist.color + ';';
                  location_artist_comment_div.appendChild(location_artist_comment_link);
                  location_text_div.appendChild(location_artist_comment_div);
                }
              }

              let location_desc_div = document.createElement('div');
              location_desc_div.className = 'cc-location-table-row-desc';
              location_desc_div.innerHTML = location.description;
              location_text_div.appendChild(location_desc_div);

              let location_addr_div = document.createElement('div');
              location_addr_div.className = 'cc-location-table-row-addr';
              let location_addr = document.createTextNode(location.address);
              location_addr_div.appendChild(location_addr);
              location_text_div.appendChild(location_addr_div);

              let location_links_div = document.createElement('div');
              location_links_div.className = 'cc-location-table-row-links';
              let direction_div = document.createElement('div');
              direction_div.className = 'map-links';
              let direction_div_anchor = document.createElement('a');
              direction_div_anchor.href = 'https://www.google.com/maps/dir/Current+Location/'+location.location.lat+','+location.location.lng;
              direction_div_anchor.target = '_blank';
              let direction_div_text = document.createTextNode('Directions');
              let direction_div_icon = document.createElement('i');
              direction_div_icon.className = 'fa fa-map-o';
              direction_div_anchor.appendChild(direction_div_text);
              direction_div_anchor.appendChild(direction_div_icon);
              direction_div.appendChild(direction_div_anchor);
              location_links_div.appendChild(direction_div);

              let web_div = document.createElement('div');
              web_div.className = 'map-links';
              let web_div_anchor = document.createElement('a');
              web_div_anchor.href = location.website;
              web_div_anchor.target = '_blank';
              web_div_anchor.className = 'location-website';
              let web_div_text = document.createTextNode('Website');
              let web_div_icon = document.createElement('i');
              web_div_icon.className = 'fa fa-laptop';
              web_div_anchor.appendChild(web_div_text);
              web_div_anchor.appendChild(web_div_icon);
              web_div.appendChild(web_div_anchor);
              location_links_div.appendChild(web_div);
              location_text_div.appendChild(location_links_div);

              location_scroller_div.appendChild(location_row);

            }
          }

          //make footer
          let footer_div = document.createElement('div');
          footer_div.className = 'cc-footer';

          let footer_text_div = document.createElement('div');
          footer_text_div.className = 'cc-footer-text';
          let footer_str = '<p>Find even more at <a href="http://collidetravel.com/" target="_blank">Collide Travel</a></p>';
          footer_text_div.innerHTML = footer_str;
          footer_div.appendChild(footer_text_div);
          location_scroller_div.appendChild(footer_div);

        }
      });
    }
  }


})();// hi there

let city_coord,marker_locations;
