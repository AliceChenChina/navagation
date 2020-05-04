
const simplyUrl = (url) => {
  return url.replace('http://', '').replace('https://', '').replace('//', '')
    .replace('www.', '').replace(/\/.*/, '');
}
const localStorageDate = window.localStorage.getItem('siteData');
let siteData;
const render = () => {
  $lastChild = $('.siteList li.last');
  $('.siteList').find('li:not(.last)').remove();
  siteData.forEach( (siteItem,index) => {
    let $elements = $(`
  <li>
  <div class="site">
          <div class="logo">
           ${simplyUrl(siteItem.site)[0].toLocaleUpperCase()}
          </div>
          <div class="link">
            ${simplyUrl(siteItem.site)}
          </div>
          <div class="removeSite">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-remove"></use>
          </svg>
          </div>
        </div>
    </li>
  `)
    $elements.insertBefore($lastChild);
    $elements.on('click', ()=>{
      window.open(siteItem.site);
    })
    $elements.on('click', '.removeSite', (e)=>{
      siteData.splice(index,1);
      window.localStorage.setItem('siteData', JSON.stringify(siteData));
      render();
     e.stopPropagation();
    })
  })
}
if(!localStorageDate) {
  const initData = [{
    site: '//www.daqianduan.com/nav/'
  },{
    site: '//www.alloyteam.com/nav/'
  }];
  siteData = initData;
} else {
  siteData = JSON.parse(localStorageDate);
}
render();
$('.addIcon').on('click',()=> {
  let url = window.prompt('请输入正确的网址');
  if(url.indexOf('http') !==0) {
    url = '//'+ url;
  }
  siteData.push({
    site: url
  })
  window.localStorage.setItem('siteData', JSON.stringify(siteData))
  render();
})


