// ==UserScript==
// @name         getBilibili personal page links
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://space.bilibili.com/*
// @grant GM_setClipboard
// @grant unsafeWindow
// @run-at document-idle
// ==/UserScript==
(function() {
    'use strict';
    //console.log('hello')
    function createNode(htmlStr){
        let doc = new DOMParser().parseFromString(htmlStr, 'text/html');
        return doc.body.firstChild;
    }
    function createNodeFragment(htmlStr){
        const template = `htmlStr`;
        let frag = document.createRange().createContextualFragment(htmlStr);
        return frag.firstChild;
    }
    function getLinks(){
         let aidList=document.querySelectorAll('li[data-aid]')
     console.log(aidList)
     let resStr=''
     for(var tmp of aidList){
        console.log(title)
         resStr+=tmp.getAttribute('data-aid')
         resStr+='\n'
         console.log(tmp.getAttribute('data-aid'))
     }
    GM_setClipboard(resStr, 'text')
    }

    function getMatchTitleLinks(pattern){
        let aidList=document.querySelectorAll('li[data-aid]')
        let resStr=''
         for(let i=0;i<aidList.length;i++){
            //  console.log(aidList[i])
            let linkAndTitleDom = aidList[i].querySelector('a.title')
            let title = linkAndTitleDom.getAttribute('title')
            let reObj=new RegExp(pattern)
            if (reObj.test(title)){
                let linkStr = linkAndTitleDom.getAttribute('href')
                linkStr='https:'+linkStr
                if (i!==aidList.length-1){
                    resStr+=linkStr+'\n'
                }else{
                    resStr+=linkStr
                }
            }
         }
         GM_setClipboard(resStr,'text')
    }
    // 在这个容器里面添加按钮和输入框
    let containerDom=createNode(` 
<div style="position:fixed;top: 0;left: 0;"></div>
    `)
    document.body.appendChild(containerDom)

    // 按钮用于绑定点击事件，因为页面的元素时js动态加载的无法判断时间，所以交给用户判断执行时机。
    let getLinksBtn = document.createElement('button')
    getLinksBtn.innerText='copy links'
    containerDom.appendChild(getLinksBtn)
    // 输入正则表达式匹配对应标题的视频链接
    let patternInput=document.createElement('input')
    patternInput.type='text'
    patternInput.setAttribute('placeholder','输入匹配标题的正则表达式')
    containerDom.appendChild(patternInput)

    getLinksBtn.addEventListener('click',function(){
        let titlePattern= patternInput.value
        getMatchTitleLinks(titlePattern)
    })

})();
// $('li[data-aid]').each(function(){res=$(this).find('img').attr('alt') ;if (res.indexOf('����������')!==-1){console.log($(this).find('a').attr('href').slice(2))}})
