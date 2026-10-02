// @ts-nocheck
// Port of the prototype's motion code. Split into hooks per section for finer control.
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from './projects';

export function initSite() {

var wl=document.getElementById('wl');
projects.forEach(function(p,i){var b=document.createElement('button');b.className='row-i';b.dataset.peek=p.image;b.dataset.i=i;
b.innerHTML='<span class="lbl sub">0'+(i+1)+'</span><span class="t">'+p.name+'</span><p class="d sub">'+p.result+'</p><span class="meta sub"><span>'+p.category+'</span><span>'+p.year+'</span></span><img class="thumb" loading="lazy" src="'+p.image+'" alt="'+p.name+' website screenshot">';wl.appendChild(b)});
var reduce=matchMedia('(prefers-reduced-motion:reduce)').matches, touch=matchMedia('(hover:none)').matches;
// contact form: POST to /api/contact, fall back to the visitor's email app
var cf=document.getElementById('cf'),cfs=document.getElementById('cfs');
cf.addEventListener('submit',function(e){e.preventDefault();var d=Object.fromEntries(new FormData(cf).entries());cfs.className='';
 if(d.company)return;
 if(!d.name||!/^\S+@\S+\.\S+$/.test(d.email||'')||!d.message){cfs.textContent='Please add your name, a valid email and a line about the idea.';cfs.className='err';return}
 var btn=cf.querySelector('button');btn.disabled=true;cfs.textContent='Sending…';
 fetch('/api/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(d)}).then(function(r){if(!r.ok)throw 0;cfs.textContent='Sent. We will be in touch soon.';cf.reset()}).catch(function(){var b=encodeURIComponent('Name: '+d.name+'\nEmail: '+d.email+'\nPhone: '+(d.phone||'')+'\nBrand: '+(d.brand||'')+'\nService: '+(d.service||'')+'\n\n'+d.message);cfs.textContent='Opening your email app instead…';location.href='mailto:hello@zhaivon.com?subject='+encodeURIComponent('New project enquiry')+'&body='+b}).then(function(){btn.disabled=false})});
// clock
function tick(){document.getElementById('clock').textContent=new Date().toLocaleTimeString('en-IN',{timeZone:'Asia/Kolkata',hour:'2-digit',minute:'2-digit',hour12:false})}tick();setInterval(tick,30000);
// dock nav
var nav=document.getElementById('nav'),ind=document.createElement('span'),act=null;ind.className='ind';nav.querySelector('ul').appendChild(ind);
var links=[].slice.call(nav.querySelectorAll('li a'));
function mv(a){gsap.to(ind,a?{x:a.offsetLeft,width:a.offsetWidth,opacity:1,duration:.45,ease:'power3.out'}:{opacity:0,duration:.2})}
links.forEach(function(a){a.addEventListener('mouseenter',function(){mv(a)});a.addEventListener('focus',function(){mv(a)});a.addEventListener('mouseleave',function(){mv(act)})});
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){act=links.filter(function(a){return a.hash==='#'+(e.target.id==='start'?'contact':e.target.id)})[0]||null;links.forEach(function(a){a.classList.toggle('on',a===act)});mv(act)}})},{rootMargin:'-45% 0px -50% 0px'});
document.querySelectorAll('main>section').forEach(function(x){io.observe(x)});
// peek follower
var peek=document.getElementById('peek');
if(!touch){var qx=gsap.quickTo(peek,'x',{duration:.5,ease:'power3'}),qy=gsap.quickTo(peek,'y',{duration:.5,ease:'power3'});
 addEventListener('mousemove',function(e){qx(e.clientX+24);qy(e.clientY-90)});
 document.querySelectorAll('[data-peek]').forEach(function(r){r.addEventListener('mouseenter',function(){var v=r.dataset.peek;if(/^http/.test(v)){peek.textContent='';peek.style.background='var(--ink) url('+v+') center/contain no-repeat'}else{peek.style.background='';peek.textContent=v}peek.classList.add('on')});r.addEventListener('mouseleave',function(){peek.classList.remove('on')})})}
// case study
var cs=document.getElementById('case'),cur=0;
function openCase(i){cur=i%projects.length;var p=projects[cur];document.getElementById('ct').textContent=p.name;document.getElementById('cr').textContent=p.result;document.getElementById('ci').innerHTML='<img src="'+p.image+'" alt="'+p.name+' website screenshot" loading="lazy" style="width:100%;height:auto;display:block">';var v=document.getElementById('cv');v.href=p.url;cs.style.visibility='visible';gsap.to(cs,{y:0,yPercent:0,duration:reduce?0:.7,ease:'power4.out'});document.getElementById('cx').focus()}
function closeCase(){gsap.to(cs,{yPercent:100,duration:reduce?0:.5,ease:'power3.in',onComplete:function(){cs.style.visibility='hidden'}})}
gsap.set(cs,{yPercent:100});
wl.addEventListener('click',function(e){var r=e.target.closest('.row-i');if(r)openCase(+r.dataset.i)});
document.getElementById('cx').onclick=closeCase;document.getElementById('cn').onclick=function(e){e.preventDefault();openCase(cur+1)};
addEventListener('keydown',function(e){if(e.key==='Escape')closeCase()});
// split statement
var st=document.getElementById('stmt');st.innerHTML=st.textContent.split(' ').map(function(w){return '<span class="w">'+w+'</span>'}).join(' ');
// root line
function build(){
 var H=document.body.scrollHeight,W=document.documentElement.clientWidth,x=W<760?W*.05:W*.07,p=document.getElementById('root');
 p.setAttribute('viewBox','0 0 '+W+' '+H);p.setAttribute('width',W);p.setAttribute('height',H);
 var secs=[].slice.call(document.querySelectorAll('main>section')),d='M'+x+' '+(secs[0].offsetTop+secs[0].offsetHeight*.9),k=0;
 secs.slice(1).forEach(function(s,i){var y=s.offsetTop+s.offsetHeight*.5,s2=(i%2?1:-1)*(10+(i*7%12));d+=' C'+(x+s2*2)+' '+(y-s.offsetHeight*.3)+' '+(x-s2)+' '+(y-s.offsetHeight*.1)+' '+(x+s2*.4)+' '+y});
 d+=' L'+x+' '+(H-60);
 document.getElementById('rp').setAttribute('d',d);
 var br=[['b1','services',1],['b2','work',1],['b3','contact',1]];
 br.forEach(function(b){var el=document.getElementById(b[0]);if(W<760){el.setAttribute('d','');return}var s=document.getElementById(b[1]),y=s.offsetTop+s.offsetHeight*.18;el.setAttribute('d','M'+x+' '+y+' c40 -6 70 8 110 -4 s40 14 70 6');el.dataset.y=s.offsetTop})
}
function drive(){
 var rp=document.getElementById('rp'),L=rp.getTotalLength(),tip=document.getElementById('tip');
 rp.style.strokeDasharray=L;rp.style.strokeDashoffset=L;
 ['b1','b2','b3'].forEach(function(id){var e=document.getElementById(id);if(!e.getAttribute('d'))return;var l=e.getTotalLength();e.style.strokeDasharray=l;e.style.strokeDashoffset=l;
  gsap.to(e,{strokeDashoffset:0,ease:'none',scrollTrigger:{start:+e.dataset.y-innerHeight*.6,end:+e.dataset.y-innerHeight*.1,scrub:true}})});
 ScrollTrigger.create({start:0,end:'max',onUpdate:function(s){var l=L*s.progress;rp.style.strokeDashoffset=L-l;var pt=rp.getPointAtLength(l);tip.setAttribute('cx',pt.x);tip.setAttribute('cy',pt.y)}});
}
function init(){
 gsap.registerPlugin(ScrollTrigger);ScrollTrigger.config({ignoreMobileResize:true});build();drive();
 if(!reduce){
  gsap.to('.w',{opacity:1,stagger:.1,ease:'none',scrollTrigger:{trigger:st,start:'top 80%',end:'bottom 45%',scrub:true}});
  if(innerWidth>=760){var tr=document.getElementById('track');gsap.to(tr,{x:function(){return -(tr.scrollWidth-innerWidth)},ease:'none',scrollTrigger:{trigger:'.proc',start:'top top',end:function(){return '+='+(tr.scrollWidth-innerWidth)},pin:true,scrub:.6,invalidateOnRefresh:true}})}
  gsap.utils.toArray('.aud div').forEach(function(el,i){gsap.from(el,{y:30,opacity:0,duration:.8,delay:i*.08,scrollTrigger:{trigger:el,start:'top 90%'}})});
 }
 // magnetic button
 var m=document.getElementById('mag');if(!touch&&!reduce){var mx=gsap.quickTo(m,'x',{duration:.4,ease:'power3'}),my=gsap.quickTo(m,'y',{duration:.4,ease:'power3'});
  m.addEventListener('mousemove',function(e){var r=m.getBoundingClientRect();mx((e.clientX-r.left-r.width/2)*.35);my((e.clientY-r.top-r.height/2)*.35)});m.addEventListener('mouseleave',function(){mx(0);my(0)})}
 var lw=document.documentElement.clientWidth,rt;addEventListener('resize',function(){clearTimeout(rt);rt=setTimeout(function(){if(Math.abs(document.documentElement.clientWidth-lw)>1)location.reload()},350)});
}
// split hero wordmark + headings
var wm=document.getElementById('wm');wm.setAttribute('aria-label','Zhaivon');wm.innerHTML=wm.textContent.split('').map(function(c){return '<span aria-hidden="true">'+c+'</span>'}).join('');
function splitH(){var g=document.getElementById('ghost');g.innerHTML=g.textContent.split('').map(function(c){return '<span>'+c+'</span>'}).join('');document.querySelectorAll('h2').forEach(function(h){h.setAttribute('aria-label',h.textContent);h.innerHTML=h.textContent.split(' ').map(function(w){return '<span class="m" aria-hidden="true"><span>'+w+'</span></span>'}).join(' ')})}
// testimonials (TODO: real quotes)
var T=[["Sample: They rebuilt our site in three weeks and our enquiries doubled.","Client name","Founder, Startup"],["Sample: Finally an agency that argued with us in the right places.","Client name","Owner, Small business"],["Sample: Our brand now looks like the company we actually are.","Client name","Director, Growing company"],["Sample: Ten seconds on my new site and people get who I am.","Client name","Creator, Personal brand"]];
var tabs=document.getElementById('tabs'),qe=document.getElementById('q'),we=document.getElementById('who'),tc=0,tt;
T.forEach(function(t,i){var b=document.createElement('button');b.innerHTML='<i></i>'+t[1]+'<br><span class="lbl">'+t[2]+'</span>';b.onclick=function(){show(i)};tabs.appendChild(b)});
function show(i){tc=i;var bs=tabs.children;for(var k=0;k<bs.length;k++){bs[k].classList.toggle('on',k===i);gsap.set(bs[k].firstChild,{scaleX:k<i?1:0})}
 qe.innerHTML=T[i][0].split(' ').map(function(w){return '<span class="m"><span>'+w+'</span></span>'}).join(' ');
 we.textContent=T[i][1]+', '+T[i][2];
 if(reduce)return;gsap.from(qe.querySelectorAll('.m>span'),{yPercent:115,duration:.9,stagger:.035,ease:'power4.out',overwrite:true});gsap.from(we,{opacity:0,y:10,delay:.4,duration:.6});
 if(tt)tt.kill();tt=gsap.to(bs[i].firstChild,{scaleX:1,duration:6,ease:'none',onComplete:function(){show((tc+1)%T.length)}})}
// extra motion
function extras(){
 var bot=false;
 function place(b){if(b===bot)return;bot=b;document.body.classList.toggle('navbot',b);if(reduce){nav.classList.toggle('bot',b);return}
  gsap.to(nav,{y:b?-24:24,opacity:0,duration:.25,ease:'power2.in',overwrite:true,onComplete:function(){nav.classList.toggle('bot',b);gsap.fromTo(nav,{y:b?30:-30,opacity:0},{y:0,opacity:1,duration:.45,ease:'power3.out'})}})}
 ScrollTrigger.create({trigger:'.hero',start:'bottom 70%',onEnter:function(){place(true)},onLeaveBack:function(){place(false)}});
 if(scrollY>innerHeight*.9)place(true);
 show(0);if(reduce){if(tt)tt.kill();return}
 gsap.utils.toArray('h2').forEach(function(h){gsap.from(h.querySelectorAll('.m>span'),{yPercent:115,rotate:4,stagger:.07,duration:1,ease:'power4.out',scrollTrigger:{trigger:h,start:'top 85%'}})});
 ScrollTrigger.batch('.row-i',{start:'top 92%',onEnter:function(b){gsap.from(b,{y:50,opacity:0,stagger:.12,duration:.9,ease:'power3.out',overwrite:true})}});
 var mt=document.getElementById('mqt');mt.innerHTML+=mt.innerHTML;
 var tw=gsap.to(mt,{xPercent:-50,duration:28,ease:'none',repeat:-1});
 ScrollTrigger.create({onUpdate:function(s){tw.timeScale(1+Math.min(Math.abs(s.getVelocity())/200,7)*(s.direction))}});
 gsap.ticker.add(function(){var t=tw.timeScale();tw.timeScale(t+(1-t)*.06)});
 gsap.to('.wm span',{y:function(i){return -50*(i%3+1)},ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:true}});
 gsap.to('.badge',{scale:.6,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:true}});
 var pe=innerWidth>=760?function(){return '+='+(document.getElementById('track').scrollWidth-innerWidth)}:'bottom bottom';
 gsap.fromTo('.bgl',{clipPath:'inset(100% 0% 0% 0%)'},{clipPath:'inset(0% 0% 0% 0%)',ease:'none',scrollTrigger:{trigger:'.proc',start:'top top',end:pe,scrub:true}});
 gsap.fromTo('.bgl',{rotate:-12,scale:.9},{rotate:12,scale:1.05,ease:'none',scrollTrigger:{trigger:'.proc',start:'top top',end:pe,scrub:true}});
 gsap.utils.toArray('.tamw span').forEach(function(t){gsap.fromTo(t,{yPercent:-8,rotate:-4},{yPercent:8,rotate:4,ease:'none',scrollTrigger:{trigger:t.parentNode.parentNode,start:'top bottom',end:'bottom top',scrub:true}})});
 gsap.from('.ghost span',{yPercent:100,stagger:.06,duration:1.2,ease:'power4.out',scrollTrigger:{trigger:'footer',start:'top 70%'}});
 gsap.from('.aud b',{x:-30,opacity:0,stagger:.15,scrollTrigger:{trigger:'.aud',start:'top 80%'}});
 if(!touch)addEventListener('mousemove',function(e){var n=e.clientX/innerWidth-.5;gsap.to('.wm span',{x:function(i){return n*(i-3)*22},duration:.9,ease:'power3.out',overwrite:'auto'})});
}
// preloader + hero load
function hero(){
 var pre=document.getElementById('pre'),k=document.querySelector('.kick s');
 if(reduce){pre.style.display='none';k.style.setProperty('--k',1);return}
 gsap.set('.kick .mask>span',{yPercent:110});gsap.set('.wm span',{yPercent:120,rotate:function(){return gsap.utils.random(-10,10)}});gsap.set('.badge,.hero .row p',{opacity:0});
 gsap.timeline()
 .to(pre,{yPercent:-100,duration:.8,delay:.6,ease:'power3.inOut'})
 .to('.kick .mask>span',{yPercent:0,duration:.9,ease:'power4.out'},'-=.3')
 .to(k,{'--k':1,duration:.5,ease:'power2.inOut'},'-=.2')
 .to('.wm span',{yPercent:0,rotate:0,duration:1.5,stagger:.08,ease:'elastic.out(1,.55)'},'-=.2')
 .fromTo('.badge',{scale:0,opacity:0},{scale:1,opacity:1,duration:.9,ease:'back.out(2)'},'-=1')
 .to('.hero .row p',{opacity:1,duration:.8},'-=.8').from('.wa',{scale:0,duration:.7,ease:'back.out(2)'},'-=.4').add(function(){pre.style.display='none'});
}
splitH();init();extras();hero();

  return function cleanup() {
    ScrollTrigger.getAll().forEach((t) => t.kill());
    gsap.globalTimeline.clear();
  };
}
