const header = document.querySelector('.header')
const cont = document.querySelectorAll('.map-content__descr')
const nav = document.querySelector('.contacts-map__tabs')
const tab = document.querySelectorAll('.contacts-tab')
const mobile = document.querySelector('.header_mobile')
const hamburger = document.querySelector('.hamburger__span')
const menu = document.querySelector('.header_mobile')


//hamburger

menu.addEventListener('click',(e)=>{
  if(e.target.nodeName == 'A'){
    header.classList.remove('active')
  }
})

document.addEventListener('DOMContentLoaded', () => {
  hamburger.addEventListener('click', (e) => {
    menu.classList.toggle('active')
  })
  window.addEventListener('scroll', ()=>{
    if(window.scrollY > 200){
      header.classList.add('header_active')
    }else{
      header.classList.remove('header_active')
    }
   
  })
  
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
  });
})


//slider with youtubeApi
const tag = document.createElement('script');
const startSeconds = 0;
const endSeconds = 210;
tag.src = "https://www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

function onYouTubeIframeAPIReady() {
  const swiper = document.getElementById('video-swiper');
  const slides = swiper.getElementsByClassName('swiper-slide')
  const players = [];
  for (let i = 0; i < slides.length; i++) {
    let element = slides[i].getElementsByClassName('yt-player')[0];
    const id = element.getAttribute('data-id');
    let player = new YT.Player(element, {
      height: '315',
      width: '650',
      videoId: id,
      playerVars: {
        autoplay: 1,
        autohide: 1,
        disablekb: 1,
        controls: 0,
        showinfo: 0,
        modestbranding: 1,
        loop: 1,
        fs: 0,
        rel: 0,
        enablejsapi: 1,
        start: startSeconds,
        end: endSeconds
      },
      events: {
        onReady: function (e) {
          e.target.mute();
          e.target.playVideo();
        },
        onStateChange: function (e) {
          if (e.data === YT.PlayerState.PLAYING) {
            document.getElementById("youtubeEmbed")
          }

          if (e.data === YT.PlayerState.ENDED) {
            player.seekTo(startSeconds);
          }
        }
      }
    });

    players.push(player);
  }
  const mySwiper = new Swiper('.swiper-container', {
    effect: 'slide',
    spaceBetween: 0,
    slidesPerView: 1,
    centeredSlides: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination'
    },
    on: {
      slideChange: function () {
        players[mySwiper.previousIndex].pauseVideo();
        players[mySwiper.activeIndex].playVideo();
      },
    }
  });

}


// function playVideo() {
//   players.playVideo();
// }

// function pauseVideo() {
//   players.pauseVideo();
// }
// const videos = document.getElementsByTagName("iframe"), fraction = 0.8;

// function checkScroll() {


//   for(var i = 0; i < videos.length; i++) {
//     let video = videos[i];

//     let x = 0,
//         y = 0,
//         w = video.width,
//         h = video.height,
//         r, 
//         b, 
//         visibleX, visibleY, visible,
//         parent;


//     parent = video;
//     while (parent && parent !== document.body) {
//       x += parent.offsetLeft;
//       y += parent.offsetTop;
//       parent = parent.offsetParent;
//     }

//     r = x + parseInt(w);
//     b = y + parseInt(h);


//     visibleX = Math.max(0, Math.min(w, window.pageXOffset + window.innerWidth - x, r - window.pageXOffset));
//     visibleY = Math.max(0, Math.min(h, window.pageYOffset + window.innerHeight - y, b - window.pageYOffset));


//     visible = visibleX * visibleY / (w * h);


//     if (visible > fraction) {
//       playVideo();
//     } else {
//       pauseVideo()

//     }
//   }

// };

// window.addEventListener('scroll', checkScroll, false);
// window.addEventListener('resize', checkScroll, false);
// window.addEventListener('load', checkScroll, false);
// checkScroll()


// tabs and google map Api
let marker;
let map;

tab.forEach((el, index)=>{
  if(index == 0){
    el.firstElementChild.innerHTML = '<img src="icons/green.svg" alt="map">';
  }else{
    el.firstElementChild.innerHTML = '<img src="icons/map.svg" alt="map">';
  }

})



function toggle(n) {
  cont.forEach((el,i) => {
    el.classList.remove('active')
    tab[i].classList.remove('active-tab')
    tab[i].firstElementChild.innerHTML = '<img src="icons/map.svg" alt="">';
  })
  
  cont[n].classList.toggle('active')
  tab[n].classList.toggle('active-tab')
  tab[n].firstElementChild.innerHTML = '<img src="icons/green.svg" alt="">';
}

nav.addEventListener('click', (e) => {
  let inx = e.target.id
  if (inx == 0) {
    toggle(e.target.id)
    changeMarkerPos(34.052235, -118.243683);
  } else if (inx == 1) {
    toggle(e.target.id)
    changeMarkerPos(40.730610, -73.935242);
  } else if (inx == 2) {
    toggle(e.target.id)
    changeMarkerPos(42.361145, 	-71.057083);
  } else {
    toggle(e.target.id)
    changeMarkerPos(42.331429, 	-83.045753);
  }
})

function initialize() {
  let styles = [{
    stylers: [{
      saturation: -100
    }]
  }];
  let styledMap = new google.maps.StyledMapType(styles, {
    name: "Styled Map"
  });
  let mapProp = {
    center: new google.maps.LatLng(34.052235, -118.243683),
    zoom: 17,
    panControl: false,
    zoomControl: false,
    mapTypeControl: false,
    scaleControl: true,
    streetViewControl: false,
    overviewMapControl: false,
    rotateControl: true,
    scrollwheel: false,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  map = new google.maps.Map(document.getElementById("map_canvas"), mapProp);

  map.mapTypes.set('map_style', styledMap);
  map.setMapTypeId('map_style')

  marker = new google.maps.Marker({
    position: new google.maps.LatLng(34.052235, -118.243683),
    animation: google.maps.Animation.DROP,
    icon: 'https://cdn2.iconfinder.com/data/icons/flat-ui-icons-24-px/24/location-24-32.png',
  });

  marker.setMap(map);
  map.panTo(marker.position);
}

function changeMarkerPos(lat, lon) {
  myLatLng = new google.maps.LatLng(lat, lon)
  marker.setPosition(myLatLng);
  map.panTo(myLatLng);
}

google.maps.event.addDomListener(window, 'load', initialize);


