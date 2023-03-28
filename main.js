// modified by InkyGo Template
// https://gitee.com/firzencode/inky-go

(function (storyContent) {
    const playBgm = (src) => {
        console.log("play bgm: " + src);
        if ('bgm' in this) {
            this.bgm.pause();
            this.bgm.removeAttribute('src');
            this.bgm.load();
        }

        this.bgm = new Audio(src);
        this.bgm.play();
        this.bgm.loop = true;
    }

    const resumeBgm = () => {
        console.log("resume bgm")
        if ('bgm' in this) {
            this.bgm.play()
        }
    }

    const pauseBgm = () => {
        console.log("pause bgm")
        if ('bgm' in this) {
            this.bgm.pause();
        }
    }

    const stopBgm = () => {
        console.log("stop bgm")
        if ('bgm' in this) {
            this.bgm.pause();
            this.bgm.load();
            this.bgm.loop = true;
        }
    }

    const isBgmPlaying = () => {
        if ('bgm' in this) {
            return !this.bgm.paused;
        }
        return false;
    }

    const getBgmSrc = () => {
        if ('bgm' in this) {
            return this.bgm.src;
        }
        return undefined;
    }
    
    // 单句模式开关，打开为 true，关闭为 false，默认关闭
    let IS_SINGLE_SENTENCE_MODE_ENABLED = false

    // 通常随机数 SEED 会被存档，即使 load & save，下一个随机数也是相同的
    // 如果想每次读档后的随机数不同，则打开它
    // 打开为 true，关闭为 false，默认关闭
    let REFRESH_RANDOM_SEED_WHEN_LOAD = false

    // Create ink story from the content using inkjs
    var story = new inkjs.Story(storyContent);

    var savePoint = "";

    let savedTheme;
    let globalTagTheme;

    const autoStyleRegArray = []

    // Global tags - those at the top of the ink file
    // We support:
    //  # theme: dark
    //  # author: Your Name
    var globalTags = story.globalTags;
    if (globalTags) {
        for (var i = 0; i < story.globalTags.length; i++) {
            var globalTag = story.globalTags[i];
            var splitTag = splitPropertyTag(globalTag);

            // THEME: dark
            if (splitTag && splitTag.property == "theme") {
                globalTagTheme = splitTag.val;
            }

            // author: Your Name
            else if (splitTag && splitTag.property == "author") {
                var byline = document.querySelector('.byline');
                byline.innerHTML = "by " + splitTag.val;
            }
        }
    }

    var storyContainer = document.querySelector('#story');
    var outerScrollContainer = document.querySelector('.outerContainer');

    // page features setup
    setupTheme(globalTagTheme);
    // var hasSave = loadSavePoint();
    setupButtons();

    // Set initial save point
    savePoint = story.state.toJson();

    // Kick off the start of the story!
    continueStory(true);

    // Main story processing function. Each time this is called it generates
    // all the next content up as far as the next set of choices.
    function continueStory(firstTime) {

        var paragraphIndex = 0;
        var delay = 0.0;

        // Don't over-scroll past new content
        var previousBottomEdge = firstTime ? 0 : contentBottomEdgeY();

        // Generate story text - loop through available content
        while (story.canContinue) {

            // Get ink to generate the next paragraph
            var paragraphText = story.Continue();
            var tags = story.currentTags;

            // Any special tags included with this line
            var customClasses = [];
            for (var i = 0; i < tags.length; i++) {
                var tag = tags[i];

                // Detect tags of the form "X: Y". Currently used for IMAGE and CLASS but could be
                // customised to be used for other things too.
                var splitTag = splitPropertyTag(tag);

                // 背景音乐
                if (splitTag && splitTag.property == "BGM") {
                    if (splitTag.val == "stop") {
                        // 停止
                        stopBgm()
                    } else if (splitTag.val == "pause") {
                        // 暂停
                        pauseBgm()
                    } else if (splitTag.val == "resume") {
                        // 继续
                        resumeBgm()
                    } else {
                        // 播放
                        playBgm(splitTag.val)
                    }
                }

                // 音效
                if (splitTag && splitTag.property == "SE") {
                    // 播放 SE
                    console.log("play se: " + splitTag.val);
                    let se = new Audio(splitTag.val);
                    se.play();
                }

                // 可控制宽度的图片
                if (splitTag && splitTag.property == "SIZE_IMAGE") {
                    let imageElement = document.createElement('img');

                    let content = splitTag.val;
                    let idx = content.indexOf("@");
                    if (idx != null) {
                        let size = content.substr(0, idx).trim();
                        let src = content.substr(idx + 1).trim();
                        imageElement.src = src;
                        imageElement.style.width = size;
                        storyContainer.appendChild(imageElement);

                        showAfter(delay, imageElement);
                        delay += 200.0;
                    }
                }

                // 背景图
                if (splitTag && splitTag.property == "BG") {
                    if (splitTag.val == "hide") {
                        hideBg();
                    } else {
                        showBg(splitTag.val);
                    }
                }

                // 自动样式
                if (splitTag && splitTag.property == "AUTO_STYLE") {
                    autoStyleRegArray.push({
                        reg: new RegExp(splitTag.val.split("@")[0]),
                        style: splitTag.val.split("@")[1]
                    })
                }
                if (splitTag && splitTag.property == "SINGLE_SENTENCE") {
                    if (splitTag.val == "on") {
                        IS_SINGLE_SENTENCE_MODE_ENABLED = true;
                    } else if (splitTag.val == "off") {
                        IS_SINGLE_SENTENCE_MODE_ENABLED = false;
                    }
                }
                // AUDIO: src
                if (splitTag && splitTag.property == "AUDIO") {
                    if ('audio' in this) {
                        this.audio.pause();
                        this.audio.removeAttribute('src');
                        this.audio.load();
                    }
                    this.audio = new Audio(splitTag.val);
                    this.audio.play();
                }

                // AUDIOLOOP: src
                else if (splitTag && splitTag.property == "AUDIOLOOP") {
                    if ('audioLoop' in this) {
                        this.audioLoop.pause();
                        this.audioLoop.removeAttribute('src');
                        this.audioLoop.load();
                    }
                    this.audioLoop = new Audio(splitTag.val);
                    this.audioLoop.play();
                    this.audioLoop.loop = true;
                }

                // IMAGE: src
                if (splitTag && splitTag.property == "IMAGE") {
                    var imageElement = document.createElement('img');
                    imageElement.src = splitTag.val;
                    storyContainer.appendChild(imageElement);

                    showAfter(delay, imageElement);
                    delay += 200.0;
                }

                // LINK: url
                else if (splitTag && splitTag.property == "LINK") {
                    window.location.href = splitTag.val;
                }

                // LINKOPEN: url
                else if (splitTag && splitTag.property == "LINKOPEN") {
                    window.open(splitTag.val);
                }

                // BACKGROUND: src
                else if (splitTag && splitTag.property == "BACKGROUND") {
                    outerScrollContainer.style.backgroundImage = 'url(' + splitTag.val + ')';
                }

                // CLASS: className
                else if (splitTag && splitTag.property == "CLASS") {
                    customClasses.push(splitTag.val);
                }

                // CLEAR - removes all existing content.
                // RESTART - clears everything and restarts the story from the beginning
                else if (tag == "CLEAR" || tag == "RESTART") {
                    removeAll("p");
                    removeAll("img");

                    // Comment out this line if you want to leave the header visible when clearing
                    setVisible(".header", false);

                    if (tag == "RESTART") {
                        restart();
                        return;
                    }
                }
            }

            // Create paragraph element (initially hidden)
            var paragraphElement = document.createElement('p');
            paragraphElement.innerHTML = paragraphText;
            storyContainer.appendChild(paragraphElement);

            // 自动样式，如果 paragraphText 匹配到了某个正则表达式，则应用对应的样式
            for (var i = 0; i < autoStyleRegArray.length; i++) {
                let reg = autoStyleRegArray[i].reg;
                let style = autoStyleRegArray[i].style;
                if (reg.test(paragraphText)) {
                    paragraphElement.classList.add(style);
                }
            }

            // Add any custom classes derived from ink tags
            for (var i = 0; i < customClasses.length; i++)
                paragraphElement.classList.add(customClasses[i]);

            // Fade in paragraph after a short delay
            showAfter(delay, paragraphElement);
            delay += 200.0;

            if (IS_SINGLE_SENTENCE_MODE_ENABLED && story.currentChoices.length == 0) {
                // 中断 continue，等待用户点击
                addSingleSentenceHint();
                break;
            }
        }

        // Create HTML choices from ink choices
        story.currentChoices.forEach(function (choice) {

            // Create paragraph with anchor element
            var choiceParagraphElement = document.createElement('p');
            choiceParagraphElement.classList.add("choice");
            choiceParagraphElement.innerHTML = `<a href='#'>${choice.text}</a>`
            storyContainer.appendChild(choiceParagraphElement);

            // Fade choice in after a short delay
            showAfter(delay, choiceParagraphElement);
            delay += 200.0;

            // Click on choice
            var choiceAnchorEl = choiceParagraphElement.querySelectorAll("a")[0];
            choiceAnchorEl.addEventListener("click", function (event) {

                // Don't follow <a> link
                event.preventDefault();

                // Remove all existing choices
                removeAll(".choice");

                // Tell the story where to go next
                story.ChooseChoiceIndex(choice.index);

                // This is where the save button will save from
                savePoint = story.state.toJson();

                // Aaand loop
                continueStory();

                // 防止冒泡
                if (IS_SINGLE_SENTENCE_MODE_ENABLED) {
                    event.stopPropagation();
                }
            });
        });

        // Extend height to fit
        // We do this manually so that removing elements and creating new ones doesn't
        // cause the height (and therefore scroll) to jump backwards temporarily.
        storyContainer.style.height = contentBottomEdgeY() + "px";

        if (!firstTime)
            scrollDown(previousBottomEdge);

    }

    function restart() {
        story.ResetState();

        setVisible(".header", true);

        // set save point to here
        savePoint = story.state.toJson();

        continueStory(true);

        outerScrollContainer.scrollTo(0, 0);
    }

    // -----------------------------------
    // Various Helper functions
    // -----------------------------------

    // Fades in an element after a specified delay
    function showAfter(delay, el) {
        el.classList.add("hide");
        setTimeout(function () { el.classList.remove("hide") }, delay);
    }

    // Scrolls the page down, but no further than the bottom edge of what you could
    // see previously, so it doesn't go too far.
    function scrollDown(previousBottomEdge) {

        // Line up top of screen with the bottom of where the previous content ended
        var target = previousBottomEdge;

        // Can't go further than the very bottom of the page
        var limit = outerScrollContainer.scrollHeight - outerScrollContainer.clientHeight;
        if (target > limit) target = limit;

        var start = outerScrollContainer.scrollTop;

        var dist = target - start;
        var duration = 300 + 300 * dist / 100;
        var startTime = null;
        function step(time) {
            if (startTime == null) startTime = time;
            var t = (time - startTime) / duration;
            var lerp = 3 * t * t - 2 * t * t * t; // ease in/out
            outerScrollContainer.scrollTo(0, (1.0 - lerp) * start + lerp * target);
            if (t < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
    }

    // The Y coordinate of the bottom end of all the story content, used
    // for growing the container, and deciding how far to scroll.
    function contentBottomEdgeY() {
        var bottomElement = storyContainer.lastElementChild;
        return bottomElement ? bottomElement.offsetTop + bottomElement.offsetHeight : 0;
    }

    // Remove all elements that match the given selector. Used for removing choices after
    // you've picked one, as well as for the CLEAR and RESTART tags.
    function removeAll(selector) {
        var allElements = storyContainer.querySelectorAll(selector);
        for (var i = 0; i < allElements.length; i++) {
            var el = allElements[i];
            el.parentNode.removeChild(el);
        }
    }

    // Used for hiding and showing the header when you CLEAR or RESTART the story respectively.
    function setVisible(selector, visible) {
        var allElements = storyContainer.querySelectorAll(selector);
        for (var i = 0; i < allElements.length; i++) {
            var el = allElements[i];
            if (!visible)
                el.classList.add("invisible");
            else
                el.classList.remove("invisible");
        }
    }

    // Helper for parsing out tags of the form:
    //  # PROPERTY: value
    // e.g. IMAGE: source path
    function splitPropertyTag(tag) {
        var propertySplitIdx = tag.indexOf(":");
        if (propertySplitIdx != null) {
            var property = tag.substr(0, propertySplitIdx).trim();
            var val = tag.substr(propertySplitIdx + 1).trim();
            return {
                property: property,
                val: val
            };
        }

        return null;
    }

    // Loads save state if exists in the browser memory
    function loadSavePoint() {
        try {
            let savedState = window.localStorage.getItem('save-state');
            if (savedState) {
                story.state.LoadJson(savedState);
                return true;
            }
        } catch (e) {
            console.debug("Couldn't load save state");
        }
        return false;
    }

    // Detects which theme (light or dark) to use
    function setupTheme(globalTagTheme) {

        // load theme from browser memory
        var savedTheme;
        try {
            savedTheme = window.localStorage.getItem('theme');
        } catch (e) {
            console.debug("Couldn't load saved theme");
        }

        // Check whether the OS/browser is configured for dark mode
        var browserDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

        if (savedTheme === "dark"
            || (savedTheme == undefined && globalTagTheme === "dark")
            || (savedTheme == undefined && globalTagTheme == undefined && browserDark))
            document.body.classList.add("dark");
    }

    // Used to hook up the functionality for global functionality buttons
    function setupButtons() {

        let rewindEl = document.getElementById("rewind");
        if (rewindEl) rewindEl.addEventListener("click", function (event) {
            removeAll("p");
            removeAll("img");
            setVisible(".header", false);
            restart();
        });

        // let saveEl = document.getElementById("save");
        // if (saveEl) saveEl.addEventListener("click", function (event) {
        //     // try {
        //     //     window.localStorage.setItem('save-state', savePoint);
        //     //     document.getElementById("reload").removeAttribute("disabled");
        //     //     window.localStorage.setItem('theme', document.body.classList.contains("dark") ? "dark" : "");
        //     // } catch (e) {
        //     //     console.warn("Couldn't save state");
        //     // }
        //     openSaveDialog();
        // });

        // let reloadEl = document.getElementById("reload");
        // if (!hasSave) {
        //     reloadEl.setAttribute("disabled", "disabled");
        // }
        // reloadEl.addEventListener("click", function (event) {
        //     if (reloadEl.getAttribute("disabled"))
        //         return;

        //     removeAll("p");
        //     removeAll("img");
        //     try {
        //         let savedState = window.localStorage.getItem('save-state');
        //         if (savedState) story.state.LoadJson(savedState);
        //     } catch (e) {
        //         console.debug("Couldn't load save state");
        //     }
        //     continueStory(true);
        // });

        let themeSwitchEl = document.getElementById("theme-switch");
        if (themeSwitchEl) themeSwitchEl.addEventListener("click", function (event) {
            document.body.classList.add("switched");
            document.body.classList.toggle("dark");
        });

        /* ----- inky go ----- */
        let loadProgressCloseBtn = document.getElementById("close-load-dialog");
        if (loadProgressCloseBtn) {
            loadProgressCloseBtn.addEventListener("click", function (event) {
                closeLoadDialog();
            })
        }

        let loadProgressShowBtn = document.getElementById("reload");
        if (loadProgressShowBtn) {
            loadProgressShowBtn.addEventListener("click", function (event) {
                openLoadDialog();
            })
        }

        let saveDialogCloseBtn = document.getElementById("close-save-dialog");
        if (saveDialogCloseBtn) {
            saveDialogCloseBtn.addEventListener("click", function (event) {
                closeSaveDialog();
            })
        }

        let saveDialogOpenBtn = document.getElementById("save");
        if (saveDialogOpenBtn) {
            saveDialogOpenBtn.addEventListener("click", function (event) {
                openSaveDialog();
            })
        };

        for (let i = 1; i <= 3; i++) {
            let btn = document.getElementById(`load-dialog-point-${i}`);
            if (btn) {
                btn.addEventListener("click", function (event) {
                    loadData(i);
                })
            }
        }

        for (let i = 1; i <= 3; i++) {
            let btn = document.getElementById(`save-dialog-point-${i}`);
            if (btn) {
                btn.addEventListener("click", function (event) {
                    saveData(i);
                })
            }
        }

        closeSaveDialog()
        closeLoadDialog()
        refreshProgressDialog();

        storyContainer.addEventListener("click", function (event) {
            // removeSingleSentenceHint();
            if (!IS_SINGLE_SENTENCE_MODE_ENABLED) {
                return
            }
            if (story.canContinue) {
                removeSingleSentenceHint();
                continueStory(false)
            }
        })
    }

    function closeLoadDialog() {
        let dialog = document.getElementById("load-dialog")
        dialog.style.visibility = "hidden";
    }

    function openLoadDialog() {
        let dialog = document.getElementById("load-dialog")
        dialog.style.visibility = "visible";
    }

    function closeSaveDialog() {
        let dialog = document.getElementById("save-dialog")
        dialog.style.visibility = "hidden";
    }

    function openSaveDialog() {
        let dialog = document.getElementById("save-dialog")
        dialog.style.visibility = "visible";
    }

    function saveData(index) {
        try {
            // 保存数据
            window.localStorage.setItem(`save-state-${index}`, savePoint);

            if (isBgmPlaying()) {
                // 如果有 BGM，则保存
                window.localStorage.setItem(`save-state-${index}-bgm`, getBgmSrc());
            } else {
                // 没有就清空数据
                window.localStorage.removeItem(`save-state-${index}-bgm`);
            }

        } catch (e) {
            console.warn("Couldn't save state");
        }
        closeSaveDialog();
        refreshProgressDialog();
    }

    function loadData(index) {
        if (!isSaveDataExist(index)) {
            return;
        }

        removeAll("p");
        removeAll("img");
        try {
            let savedState = window.localStorage.getItem(`save-state-${index}`);
            if (savedState) story.state.LoadJson(savedState);

            let savedBgm = window.localStorage.getItem(`save-state-${index}-bgm`);
            if (savedBgm) {
                playBgm(savedBgm);
            } else {
                stopBgm();
            }
        } catch (e) {
            console.debug("Couldn't load save state");
        }
        refreshProgressDialog();
        closeLoadDialog();
        if (REFRESH_RANDOM_SEED_WHEN_LOAD) {
            story.state.storySeed = new Date().getTime() % 100;
            story.state.previousRandom = 0
        }
        continueStory(true);
    }

    function isSaveDataExist(index) {
        try {
            let savedState = window.localStorage.getItem(`save-state-${index}`);
            if (savedState) {
                return true;
            } else {
                return false;
            }
        } catch (e) {
            console.debug("Couldn't load save state");
            return false;
        }
    }

    function refreshProgressDialog() {
        for (let i = 1; i <= 3; i++) {
            let content = document.getElementById(`load-dialog-point-${i}`)
            if (isSaveDataExist(i)) {
                content.innerText = `存档 ${i}`
            } else {
                content.innerText = `没有数据`
            }
        }
        for (let i = 1; i <= 3; i++) {
            let content = document.getElementById(`save-dialog-point-${i}`)
            if (isSaveDataExist(i)) {
                content.innerText = `存档 ${i}，点击覆盖`
            } else {
                content.innerText = `没有数据，点击保存`
            }
        }
    }

    function addSingleSentenceHint() {
        removeSingleSentenceHint()
        if (story.canContinue) {
            setTimeout(function () {
                var hint = document.createElement('p');
                hint.innerText = "▽";
                hint.id = "single-sentence-hint"
                storyContainer.appendChild(hint);
                hint.classList.add("blink")
            }, 400);
        }
    }

    function removeSingleSentenceHint() {
        var hint = document.getElementById("single-sentence-hint")
        if (hint) {
            hint.parentElement.removeChild(hint)
        }
    }

    function hideBg() {
        let bgImg = document.getElementById("bg_img")
        if (bgImg) {
            bgImg.style.visibility = "hidden";
        }
    }

    function showBg(src) {
        let bgImg = document.getElementById("bg_img")
        if (bgImg) {
            bgImg.onload = function () {
                bgImg.style.visibility = "visible";
            }
            bgImg.src = src;
        }
    }
})(storyContent);
