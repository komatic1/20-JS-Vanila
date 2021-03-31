const fbpost = 'https://www.facebook.com/zelenskiy95/posts/2760575010859524';
const fbvideo = '<iframe src="https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2Fzelenskiy95%2Fvideos%2F2760561837527508%2F&show_text=false&width=560" width="560" height="314" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" allowFullScreen="true"></iframe>';
const ins = 'https://www.instagram.com/p/CLwAj67B5vP/'
const tw = 'https://twitter.com/poroshenko/status/1365207682580422656'
const yt = 'https://www.youtube.com/watch?v=vlvtqp44xoQ&ab_channel=KarolinaSowinska';
const vm ='https://vimeo.com/475429211'

console.log(fbpost.match(/^https?:\/\/www\.facebook\.com?/).length);

console.log(fbvideo.match(/^<iframe src=/i).length);

console.log(ins.match(/^https?:\/\/www\.instagram\.com?/).length);

console.log(tw.match(/^https?:\/\/twitter\.com?/).length);

console.log(yt.match(/^https?:\/\/www\.youtube\.com?/).length);

console.log(vm.match(/^https?:\/\/vimeo\.com?/).length);