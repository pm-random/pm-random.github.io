import{d as V,g as p,h as v,u as j,c as l,a as e,F as i,r as _,i as u,o as n,t as a,f as h,_ as b}from"./index-DL_YHEuF.js";const x={class:"card table-responsive"},w={class:"w-100"},A={key:0,class:"voiceactors--jp"},C={class:"voiceactors--chara-list"},B=["src"],F={class:"card table-responsive"},N={class:"w-100"},M={key:0,class:"voiceactors--jp"},P=V({__name:"VoiceActorsView",setup($){function f(o,s){const t=s.get(o);return t==null?h(`images/characters/256/${o}_256.ktx.png`):h(`images/characters/${t}`)}const c=p(),d=p(),m=p(),g=v("va/jp"),y=v("va/misc");return j("Voice Actors | PM Random"),Promise.all([g,y]).then(([o,s])=>{c.value=o,d.value=s.jp_former,m.value=new Map(s.exceptions.map(t=>[t.id,t.path]))}),(o,s)=>(n(),l("div",null,[s[4]||(s[4]=e("h1",null,"Voice Actors",-1)),c.value!=null&&m.value!=null?(n(),l(i,{key:0},[s[1]||(s[1]=e("h2",null,"Current",-1)),e("div",x,[e("table",w,[s[0]||(s[0]=e("thead",null,[e("tr",null,[e("th",null,"Voice actor"),e("th",null,"Characters")])],-1)),e("tbody",null,[(n(!0),l(i,null,_(c.value,t=>(n(),l("tr",{key:t.name},[e("td",null,[e("div",null,a(t.name),1),t.name_jp?(n(),l("div",A,a(t.name_jp),1)):u("",!0)]),e("td",null,[e("div",C,[(n(!0),l(i,null,_(t.characters,r=>(n(),l("figure",{key:r.id,class:"voiceactors--chara px-2"},[e("img",{src:f(r.id,m.value),class:"voiceactors--chara-img",loading:"lazy"},null,8,B),e("figcaption",null,a(r.name),1)]))),128))])])]))),128))])])])],64)):u("",!0),d.value!=null?(n(),l(i,{key:1},[s[3]||(s[3]=e("h2",null,"Former",-1)),e("div",F,[e("table",N,[s[2]||(s[2]=e("thead",null,[e("th",null,"Voice actor"),e("th",null,"Characters"),e("th",null,"Notes")],-1)),e("tbody",null,[(n(!0),l(i,null,_(d.value,(t,r)=>(n(),l("tr",{key:r},[e("td",null,[e("div",null,a(t.name),1),t.name_jp?(n(),l("div",M,a(t.name_jp),1)):u("",!0)]),e("td",null,a(t.characters.map(k=>k.name).join(", ")),1),e("td",null,a(t.notes),1)]))),128))])])])],64)):u("",!0)]))}}),D=b(P,[["__scopeId","data-v-53f8e008"]]);export{D as default};
