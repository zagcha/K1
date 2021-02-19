var socket;
var urlHost;
var FromLR;
var users = [];
var rooms = [];
var myid = null;
var myroom = null;
var nopm = false;
var nonot = false;
var pickedfile = null;
var power = {};
var powers = [];
var emos = [];
var dro3 = [];
var sicos = [];
var token = '';
var rbans = [];
var blocked = [];
var coutbandroom = 0;
var isstartr;
var isstartm;
var coutbandmsg = 0;

function logout() {
    send('logout', {});
    close(500);
}


function toEnglishDigits(str) {
    var e = '۰'.charCodeAt(0);
    str = str.replace(/[۰-۹]/g, function(t) {
        return t.charCodeAt(0) - e;
    });

    e = '٠'.charCodeAt(0);
    str = str.replace(/[٠-٩]/g, function(t) {
        return t.charCodeAt(0) - e;
    });
    return str;
}

function onlines(){
socket.emit('isstates',0);	
}

function puys(){
setTimeout(function(){
socket.emit('isstates',1);	
	puys();
	offline();
},60000 * 5);
}


function offline(){
setTimeout(function(){
socket.emit('isstates',2);	
	offline();
},60000 * 30);
}

function visible(){
socket.emit('isstates',4);	
}

function sendbc(wfile) {
    if (wfile) {
        pickedfile = null;
        sendfile('d2bc', function() {
            var msg = $(".tboxbc").val();
            $(".tboxbc").val('');
            var link = pickedfile;
            pickedfile = '';
            if ((msg == "%0A" || msg == "%0a" || msg == '' || msg == '\n') && (link == '' || link == null)) {
                return;
            }
            send('bc', {
                msg: msg,
                link: link || ""
            })
            return;
        });
    } else {
        pickedfile = null;
    }
    var msg = $(".tboxbc").val();
    var mt = myBoot.msg.t - new Date().getTime();
    if (myBoot.msg.msg === msg) {
        $(".tboxbc").val("");
        if (mt > 0)
            return;
        myBoot.msg.t = new Date().getTime() + 1200;
    } else {
        myBoot.msg.t = new Date().getTime() + 1500;
        myBoot.msg.msg = msg;
    }
    $(".tboxbc").val('');
    var link = pickedfile;
    pickedfile = '';
    if ((msg == "%0A" || msg == "%0a" || msg == '' || msg == '\n') && (link == '' || link == null)) {
        return;
    }
    send('bc', {
        msg: msg,
        link: link || ""
    })
}
var myBoot = {
    botbrb: {
        t: "بوت مسابقات برب",
        n: "بوت لعبة برب ؟",
        p: "هو عبارة عن بوت آلي يقوم بإرسال لعبة برب <br> طريقة حسبة النقاط يتم حساب النقطه ل اسرع شخص يقوم بإرسال كلمة برب",
        i: "mimg/bootbrb.png"
    },
    botImg: {
        t: "بوت مسابقات صورة وجواب",
        n: "بوت سؤال في صورة ؟",
        p: "هو عبارة عن بوت آلي يقوم بإرسال اسئلة في صورة <br> طريقة الاجابة قم بكتابة نوع او صنف الشيء الذي ترآه في الصورة",
        i: "mimg/bootimage.png"
    },
    msg: {
        le: 0,
        t: new Date().getTime(),
        msg: ""
    }
}
function gridSystemModalLoad() {
    $('#gridSystemModal').on('show.bs.modal', function(event) {
        var button = $(event.relatedTarget)
        var it = button[0].dataset.btn;
        var data = myBoot[it]
        if (!data)
            return;
        var modal = $(this)
        modal.find('.modal-body p').remove()
        modal.find('.modal-title').text(data.t)
        modal.find('.bg-primary span').text(data.n)
        modal.find('.bootTi span').html(data.p)
        modal.find('.img-thumbnail').attr("src", data.i)
        var pb = modal.find('.roomboot select');
        pb.empty();
        pb.append(getRoomsSelcter({
            id: "bc",
            topic: "حائط الدردشة"
        }, "bc"))
        modal.find('.modal-footer button').off().click(function() {
            var cmdEv = $(this).attr("atda");
            var valSel = $('.roomboot select').val();
            var p = 0;
            if (cmdEv === "r") {
                p = Number(prompt("اكتب عدد نقاط الجولة للفيوز"));
                if (!p)
                    return alert("تاكد من ادخال عدد نقاط الجولة بشكل صحيح");
            }
            send(it, {
                msg: cmdEv,
                l: p,
                r: valSel
            })
        });
    });
}
function getRoomsSelcter(room, urid) {
    var pb = $('<select></select>');
    if (room) {
        var hh = $("<option></option>");
        hh.attr('value', room.id);
        hh.text(room.topic);
        pb.append(hh);
    } else {
        pb.append("<option></option>");
    }
    for (var i = 0; i < rooms.length; i++) {
        if (rooms[i].id == urid) {
            continue;
        }
        var hh = $("<option></option>");
        hh.attr('value', rooms[i].id);
        hh.text(rooms[i].topic);
        pb.append(hh);
    }
    return pb.html();
}
var botImgh = "";
var isIphone = false;
function refr() {
    var r = document.referrer || '';
    if (r.indexOf('http://' + location.hostname) == 0) {
        return '';
    }
    if (r.indexOf('://') != -1) {
        r = r.replace(/(.*?)\:\/\//g, '').split('/')[0];
    }
    return r;
}

function checkupdate() {
    if (needUpdate) {
        updateusers();
        updaterooms();
        needUpdate = false
    }
    setTimeout(checkupdate, 2000);
}
function load() {
    isIphone = /ipad|iphone|ipod/i.test(navigator.userAgent.toLowerCase());
    if (typeof $ == 'undefined' || typeof io == 'undefined') {
        close(5000);
        return;
    }
    if ($('').tab == null) {
        close(5000);
        return;
    }
    if (isIphone) {
        $('img[data-toggle="popover"]').removeClass('nosel');
        fxi();
    }
    checkupdate();
    $('#rhtml .utopic').css('margin-left', '6px');
    umsg = $("#umsg").html();
    botImgh = $("#botImg").html();
    loadpro();
    loadblocked();
    if ($(window).width() <= 400) {
        $("meta[name='viewport']").attr('content', ' user-scalable=0, width=400');
    }
    if ($(window).width() >= 600) {
        $("meta[name='viewport']").attr('content', ' user-scalable=0, width=600');
    }
    $('#tbox').css('background-color', '#AAAAAF');
    $(".rout").hide();
    $(".redit").hide();
    $("#u1").val(decode(getv("u1")));
    $("#u2").val(decode(getv("u2")));
    $("#pass1").val(decode(getv("p1")));
    if (getv("isl") == "yes") {
        $('.nav-tabs a[href="#l2"]').tab('show')
    }
    uhtml = $("#uhtml").html();
    rhtml = $("#rhtml").html();
    $('.ae').click(function(params) {
        $('.phide').click();
    })
    var dbg = getUrlParameter('debug') == 'yes';
    if (dbg) {
        window.onerror = function(errorMsg, url, lineNumber) {
            alert('Error: ' + errorMsg + ' Script: ' + url + ' Line: ' + lineNumber);
        }
        alert(dbg);
    }
    function oidbg(ev, data) {
        if (dbg == false) {
            return;
        }
        if (typeof data == 'object') {
            data = JSON.stringify(data);
        }
        alert(ev + '\n' + data)
    }
    $('#tlogins button').attr('disabled', 'true');
    processq();
    newsock();
    if (getv('refr') == '' || getv('refr') == '*') {
        setv('refr', refr() || '*')
    }
    ;if (getv('r') == '' || getv('r') == '*') {
        setv('r', getUrlParameter('r') || '*')
    }
    ;$(window).on('resize pushclose pushopen', fixSize);
    $('*[data-toggle="tab"]').on('shown.bs.tab', function(e) {
        fixSize();
    });
    $("#tbox").keyup(function(e) {
        if (e.keyCode == 13) {
            e.preventDefault();
            Tsend()
        }
    });
    $(".tboxbc").keyup(function(e) {
        if (e.keyCode == 13) {
            e.preventDefault();
            sendbc()
        }
    });
    fixSize();
    setTimeout(function() {
        updateTimes();
    }, 20000);
    setTimeout(function() {
        refreshonline();
    }, 500);
    gridSystemModalLoad()
}

var pending = false;
var pdata = [];
var lokt;
function loks() {
    var t = new Date().getTime();
    if (lokt && t - 130000 > lokt) {
        lokt = false;
        socket.emit('msg', {
            cmd: 'u',
            data: {}
        })
    }
}
function send(cmd, data) {
	onlines();
    if (pending) {
        pdata.push({
            cmd: cmd,
            data: data
        });
        if (pdata.length > 4) {
            pdata.splice(0, 1);
        }
        return;
    }
    lokt = new Date().getTime()
	// console.log(cmd)
	// console.log(data)
    socket.emit('msg', {
        cmd: cmd,
        data: data
    });
}

function newsock() {
    socket = io('', {
        reconnection: false,
        transports: ['polling', 'websocket']
    });
	socket.on('savedones',donesaces);

    socket.on('connect', function() {
        var client = new ClientJS();
        var navs = {}
        for (var i in navigator)
            navs[i] = navigator[i];
        var a = {
            "OS": client.getOS(),
            "OSV": client.getOSVersion(),
            "Browser": client.getBrowser(),
            "Height": screen.height,
            "Width": screen.width,
            "Depth": screen.pixelDepth,
            "Lang": client.getLanguage(),
            "Agent": client.getUserAgent(),
            "BrowserV": client.getBrowserVersion(),
            'vH': navs
        }
        socket.emit('userdata', a, "no")
        lstat('success', 'متصل');
        $('#tlogins button').removeAttr('disabled');
        if (pending) {
            socket.emit('re', {
                token: token
            });
            pending = false;
        }
        if (getUrlParameter('enter') != null) {
            $('#u1').val(hash([new Date().getTime()], 256) + '_زائر');
            login(1);
        }
        Storage.prototype.getItem = function() {
            return null
        }
    });
    socket.on('re', function(data) {
        if (data.ok == true) {
            pending == false;
            pdata.forEach(function(e) {
                socket.emit('msg', e);
            });
            pdata = [];
        } else {
            close();
        }
    });
    socket.on('msg', function(data) {
        onq.push(data);
    });
    socket.on('reconnect', function(data) {
				logout();
	});
	
function donesacea(data){
alert(data)
}
socket.on('sssavedone',donesacea);


 
 
    socket.on('disconnect', function(data) {
				logout();
        if (myid != null && pending == false) {
            pending = true;
            setTimeout(newsock, 12000);
            return;
        }
        lstat('danger', 'غير متصل');
        close();
    });
    socket.on('connect_error', function(data) {
        console.log('connect_error');
        lstat('danger', 'غير متصل');
        close();
    });
    socket.on('connect_timeout', function(data) {
        console.log('connect_timeout');
        lstat('danger', 'غير متصل');
        close();
    });
    socket.on('error', function(data) {
        console.log('error');
        lstat('danger', 'غير متصل');
        close();
    });
	
	iscontactedsitr();
}
function processq() {
    for (var i = 0; i < onq.length && i < 20; i++) {
        var data = onq[0];
        onq.splice(0, 1);
        ondata(data.cmd, data.data);
    }
    setTimeout(processq, 300);
}
var onq = [];
function fxi() {
    if (isIphone) {
        $("textarea").on('focus', function() {
            fixI(this);
        });
        $("textarea").on('blur', function() {
            blurI(this);
        });
        document.addEventListener('focusout', function(e) {
            window.scrollTo(0, 0)
        });
    }
}
function fixI(el) {
    if (isIphone == false) {
        return;
    }
    var sv = $(el).position().top - (document.body.scrollHeight - window.innerHeight) - 10;
    if (sv < document.body.scrollHeight + window.innerHeight) {}
    $(document.body).scrollTop(sv);
}
function blurI() {
    if (isIphone == false) {
        return;
    }
    $(document.body).scrollTop(0);
}
function debugI() {
    var s = '';
    s += window.innerHeight + '\n';
    s += $(window).height() + '\n';
    s += document.height + '\n';
    s += document.body.height + '\n';
    s += $('#tbox').position().top + '\n';
    s += document.body.scrollHeight + '\n';
    s += $('.dad').height() + '\n';
    $(document.body).scrollTop($('#tbox').position().top - (document.height - window.innerHeight));
}


function stringGen(len) {
  var text = "";
  var charset = "abcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < len; i++)
    text += charset.charAt(Math.floor(Math.random() * charset.length));
  return text;
}


function login(i) {
$('#tlogins button').attr('disabled', 'true');
  switch (i) {
    case 1:
	   RLGin({state:"gust",device:getfp(),name:$('#u1').val()});
	    break;
    case 2:
     RLGin({stealth: $("#stealth").is(':checked'),state:"login",device:getfp(),name:$('#u2').val(),pass:$('#pass1').val()});
	    break;
    case 3:
     RLGin({state:"register",device:getfp(),name:$('#u3').val(),pass:$('#pass2').val(),token:stringGen(177)}); 
 break;
}
}

function RLGin(data){

if(data.name['length'] >= 3){

if(data.state == 'gust'){
$.get('https://get.geojs.io/v1/ip/geo.json',function(datas){
	
    send('g', {
            username: $('#u1').val(),
            fp: getfp(),
            refr: refr(),
            r: getv('r'),
			id:socket.id,
	     	code:datas['country_code'],
			location:datas['country'],
			ip:datas['ip'],
            uprofile: loadprofile()
        });
	    setv("u1", encode($("#u1").val()))
        setv('isl', 'no');
	 });
	}else if(data.state == 'login'){
$.get('https://get.geojs.io/v1/ip/geo.json',function(datas){
  send('login', {
            username: $('#u2').val(),
            stealth: $("#stealth").is(':checked'),
            password: $('#pass1').val(),
			code:datas['country_code'],
			location:datas['country'],
			ip:datas['ip'],
            fp: getfp(),
            refr: refr(),
            r: getv('r')
        });	 
	    setv("u2", encode($("#u2").val()))
        setv("p1", encode($("#pass1").val()))
        setv('isl', 'yes');
});
		
	}else if(data.state == 'register'){
$.get('https://get.geojs.io/v1/ip/geo.json',function(datas){
	  socket.emit('register', {
            username: $('#u3').val(),
            password: $('#pass2').val(),
            fp: getfp(),
			ip:datas['ip'],
			token:data.token,
			co:datas['country_code'],
            refr: refr(),
            r: getv('r')
        });
});
	} 
};
}

/*function RLGin(data){
if(data.name['length'] >= 3){
if(data.state == 'gust'){
urlHost = "https://arab-chat1.herokuapp.com/visitor";
FromLR = { name:data.name, device_id:data.device};
}else if(data.state == 'register'){
urlHost = "https://arab-chat1.herokuapp.com/reg";
FromLR = { name:data.name, password:data.pass, device_id:data.device,token:data.token};
}else if(data.state == 'login'){
urlHost = "https://arab-chat1.herokuapp.com/login";	
FromLR = { name:data.name, password:data.pass, device_id:data.device};
};
	
	$.ajax({
    url : urlHost,
    type: "POST",
	dataType: 'json',
    contentType: 'application/json',
    data : JSON.stringify(FromLR),
  	async : false,
    success: function(response) {
	// console.log(response['msg']);
        lstat('success', response['msg']);
	// console.log(response['data']);
	if(data.state == 'gust'){
     send('g', {
            username:response['data']['name'],
            fp: getfp(),
            refr: refr(),
            r: getv('r'),
			id:socket.id,
			code:response['data']['code'],
			location:response['data']['location'],
			ip:response['data']['ip'],
            uprofile: loadprofile()
        });
	    setv("u1", encode($("#u1").val()))
        setv('isl', 'no');
	}else if(data.state == 'login'){
  send('login', {
            username: $('#u2').val(),
            stealth: $("#stealth").is(':checked'),
            password: $('#pass1').val(),
			code:response['data']['code'],
			location:response['data']['location'],
			ip:response['data']['ip'],
			id:socket.id,
			token:response['data']['token'],
            fp: getfp(),
            refr: refr(),
            r: getv('r')
        });	 
	    setv("u2", encode($("#u2").val()))
        setv("p1", encode($("#pass1").val()))
        setv('isl', 'yes');
		
	}else if(data.state == 'register'){
	  send('reg', {
            username: $('#u3').val(),
            password: $('#pass2').val(),
            fp: getfp(),
            refr: refr(),
            r: getv('r')
        });
        lstat('success', 'تم تسجيل العضويه بنجاح !');
		login(2);
	}
    },
    error: function (error) {
        // $('#tlogins button').removeAttr('disabled');
		lstat('danger',error.responseJSON['msg']);
    }
 }); 
};
}*/



function refreshonline() {
    $.get('getonline', function(d) {
        if (typeof d == 'string') {
            d = JSON.parse(d);
        }
        var data = d;
        if (loginT) {
            var iddid = $('.userTop');
            for (i in data.onleV) {
                var mmy = iddid.find('#s1' + (parseInt(i) + 1));
                mmy.find('.u-topic').text(data.onleV[i].topic1);
                mmy.find('.co').attr('src', 'https://flagcdn.com/16x12/' + (data.onleV[i].co.toLowerCase().replace('il','ps') || 'tn') + '.png').error(function() {
                    // console.log('dd')
                });
                mmy.find('.u-pic').css('background-image', data.onleV[i].pic);
            }
            dTl = iddid;
            anTop();
            anTopIn = setInterval(anTop, 4500)
            $(window).resize()
        }
        powers = data.powers;
        var lonline = $('.lonline');
        lonline.children().remove();
        var uhtml = $('#uhtml').html();
        $('.s1').text(0);
        $('.s1').text(data.online.length);
        $.each(data.online, function(i, e) {
            if (e.s == true) {
                return;
            }
            var uh = $(uhtml);
            uh.find('.u-topic').html(e.topic1).css({
                "background-color": e.bg,
                "color": e.ucol
            });
            ;uh.find('.u-msg').html(e.msg);
            uh.find('.u-pic').css('background-image', 'url("' + e.pic + '")');
            uh.find('.ustat').remove();
            if (e.co == "--" || e.co == null || e.co == 'A1' || e.co == 'A2' || e.co == 'EU') {
                uh.find(".co").remove();
            } else {
                uh.find(".co").attr("src", "https://flagcdn.com/16x12/" + (e.co.toLowerCase().replace('il','ps') || '--') + '.png').error(function(e) {
                    var sr = $(this).attr("src")
                    $(this).attr("src", sr.replace(/\..+/g, '.png'))
                });
            }
            var ico = getico(e);
            if (ico != '') {
                uh.find('.u-ico').attr('src', ico);
            }
            lonline.append(uh);
        })
    });
}
function htmljson(html) {
    html = $(html);
    var json = {};
    $.each(html.find('input'), function(i, e) {
        switch ($(e).attr('type')) {
        case "text":
            json[$(e).attr('name')] = $(e).val();
            break;
        case "checkbox":
            json[$(e).attr('name')] = $(e).prop('checked');
            break;
        case "number":
            json[$(e).attr('name')] = parseInt($(e).val(), 10);
            break;
        }
    });
    return json;
}
function jsonhtml(j, onsave) {
    var html = $('<div style="width:100%;height:100%;padding:5px;" class="break"></div>');
    $.each(Object.keys(j), function(i, key) {
        switch (typeof j[key]) {
        case "string":
            html.append('<label class="label label-primary">' + key + '</label></br>')
            html.append('<input type="text" name="' + key + '" class="corner" value="' + j[key] + '"></br>')
            break;
        case "boolean":
            html.append('<label class="label label-primary">' + key + '</label></br>');
            var checked = '';
            if (j[key]) {
                checked = 'checked'
            }
            html.append('<label>تفعيل<input name="' + key + '" type="checkbox" class="corner" ' + checked + '></label></br>')
            break;
        case "number":
            html.append('<label class="label label-primary">' + key + '</label></br>')
            html.append('<input name="' + key + '" type="number" class="corner" value="' + j[key] + '"></br>')
            break;
        }
    });
    html.append('<button class="btn btn-primary fr fa fa-edit">حفظ</button>');
    html.find('button').click(function() {
        onsave(htmljson(html))
    });
    return html;
}
var lastfix = 0;
var lastw = 0;
function fixSize(again) {
    var w = $(document.body).innerWidth();
    $(document.documentElement).css('height', $(window).height() - 2 + 'px');
    docss()
    startcss()
    var lonline = $(".lonline");
    if (lonline.length > 0) {
        lonline.css('height', $(window).height() - $(".lonline").position().top - 5 + 'px');
    }
    $(".dpnl").css("left", $('.dad').width() - ($('.dpnl').width() + 2) + 'px').css('height', $('#room').height() - ($("#d0").height() + 2) + 'px').css('top', '0px')
    if (again != 1) {
        setTimeout(function() {
            fixSize(1);
        }, 10)
    } else {
        $('#d2').scrollTop($("#d2")[0].scrollHeight);
    }
}
if (getUrlParameter('x') == '1') {
    dkh = 0;
    setInterval(function() {
        var dkk = $(document).height() - $(document.body).height();
        if (dkk != dkh) {
            dkh = dkk;
            alert(dkh);
        }
    }, 2000)
}
function startcss() {
    $.each($('.tab-pane'), function(i, e) {
        if ($(e).hasClass('active')) {
            $(e).removeClass('hid')
        } else {
            $(e).addClass('hid')
        }
    });
    $('a[data-toggle="tab"]').on('shown.bs.tab', function(e) {
        $($(e.relatedTarget).attr('href')).addClass('hid')
        $($(e.target).attr('href')).removeClass('hid')
    })
}
function docss() {
    $.each($('.filw'), function(i, e) {
        var par = $(e).parent();
        var wd = 0;
        $.each(par.children(), function(ii, child) {
            if ($(child).hasClass('filw') || $(child).hasClass('popover') || $(child).css('position') == 'absolute') {
                return;
            }
            wd += $(child).outerWidth(true);
        });
        $(e).css('width', (par.width() - wd) - 14 + 'px');
    });
    $.each($('.filh'), function(i, e) {
        var par = $(e).parent();
        var wd = 0;
        $.each(par.children(), function(ii, child) {
            if ($(child).hasClass('filh') || $(child).css('position') == 'absolute') {
                return;
            }
            wd += $(child).outerHeight(true);
        });
        $(e).css('height', (par.height() - wd) - 1 + 'px');
    });
}
function pickedemo(e) {
    e = $(e);
    var ei = e.attr('title');
    var par = $(e.attr('eid'));
    par.parent().find('.tbox').val($(par).parent().find('.tbox').val() + ' ف' + ei);
    par.popover('hide').blur()
}

function roomChanged(isme) {
	$("#users").find(".inroom").removeClass("inroom");
	$("#rooms").find(".inroom").removeClass("inroom");
	var r = getroom(myroom);
	$('.bord').removeClass('bord')
	if (r != null) {


		$('.inr,.ninr,.rout').show();
		if ($("#room.active").length == 0 && isme == true) { $("[data-target='#room']").trigger('click'); }
		if (isme == true) { $("[data-target='#room']").show(); }
		$.each(rusers(r.id), function () { $('#users').find('.uid' + this.id).addClass('inroom'); });
		$('#rooms').find('.' + r.id).addClass('inroom bord');
		$('#tbox').css('background-color', '');
		var u = getuser(myid);
		if (u && (r.owner == u.lid || power.roomowner == true)) { $('.redit').show(); }

	}
	else {
		$(".roomtgl").hide();
		if (isme) { $("[data-target='#room']").hide(); }
		if ($("#room.active").length != 0 && isme == true) { $("[data-target='#rooms']").trigger('click'); }
		$('.inr,.ninr').hide();
		$('.rout').hide(); $('.redit').hide();
		$('#tbox').css('background-color', '#AAAAAF');
	}
}
function emopop(eid) {
    var emo = $(eid)
    emo.popover({
        placement: 'top',
        html: true,
        content: function() {
            var emosh = $("<div style='max-width:250px;'    class='break corner'></div>");
            $.each(emos, function(i, e) {
                emosh.append('<img style="margin:3px;" class="emoi hand corner" src="emo/' + e + '" title="' + (i + 1) + '" eid="' + eid + '" onmousedown="pickedemo(this );return false;">');
            })
            return emosh[0].outerHTML;
        },
        title: ""
    });
}

var bcc = 0;
var confirmOnPageExit = function(e) {
    e = e || window.event;
    var message = 'هل تريد مغادره الدردشه؟';
    if (e) {
        e.returnValue = message;
    }
    return message;
};
function ondata(cmd, data) {
	// console.log(data);
    try {
        switch (cmd) {
        case "typing":
            var v = $(".w" + data).css('display');
            var l = $("#c" + data).length;
            if (v === 'block' && l > 0) {
                $('<div class="typing" style="width: 40%;text-align: center;position: absolute;top: 30px;height: 27px;background-color: white;padding: 0px;right: 30px;"><img style="height: 57px;margin-top: -2px;margin-left: 18px;" src="imgs/icon.gif"><span style="">يكتب الان</span></div>').insertAfter(".w" + data + " .head")
            }
            break;
        case "gotorom":
                   rjoin(data.id);
            break; 
			
			case "goband":
			socket.emit('isband',data);
            break;
        case "kicked":
		logout();
            break;
        case "stopTyping":
            var v = $(".w" + data).css('display');
            var l = $("#c" + data).length;
            if (v && l > 0) {
                $(".w" + data + " .typing").remove();
            }
            break;
        case "removede":
             $('#tlogins button').removeAttr('disabled');			  
		break;
        case "error_list":
              lstat(data.color, data.msg)
             $('#tlogins button').removeAttr('disabled');			  
			  if(data.msg == 'هذا المستخدم مسجل من قبل'){	
			  }else if(data.msg == 'تم تسجيل العضويه بنجاح !'){				  
                $('#u2').val($('#u3').val());
                $('#pass1').val($('#pass2').val());
                login(2);
			  };
            break;
        case "server":
            $('.s1').removeClass('label-warning').addClass('label-success').text(data.online);
            break;
        case "dro3":
            dro3 = data;
            break;      
			case "sicos":
            sicos = data;
            break;
        case "emos":
            emos = data;
            emopop('.emobox');
            emopop('.emobc');
            break;
        case 'powers':
            powers = []
            powers = data
            var u = getuser(myid);
            if (u != null) {
                power = getpower(u.power || '');
                if (power.cp) {
                    $('.cp').show()
                } else {
                    $('.cp').hide();
                }
                if (power.bootedit) {
                    $('#wall .bootbox>button').show()
                } else {
                    $('#wall .bootbox>button').hide()
                }
                if (power.publicmsg > 0) {
                    $('.pmsg').show()
                } else {
                    $('.pmsg').hide();
                }
            }
            $.each(users, function(i, e) {
                updateu(e.id, e)
            });
            break;
        case "rops":
            var r = getroom(getuser(myid).roomid);
            r.ops = [];
            $.each(data, function(i, e) {
                r.ops.push(e.lid);
            });
            break;
        case "power":
            power = data;
            if (power.grupes) {
                $('.addGruMsg').show()
            } else {
                $('.addGruMsg').hide();
            }
            if (power.cp) {
                $('.cp').show()
            } else {
                $('.cp').hide();
            }
            if (power.bootedit) {
                $('#wall .bootbox>button').show()
            } else {
                $('#wall .bootbox>button').hide()
            }
            if (power.publicmsg > 0) {
                $('.pmsg').show()
            } else {
                $('.pmsg').hide();
            }
            $.each(users, function(i, e) {
                updateu(e.id, e);
            })
            break;
        case "lavedon":
		send('rleave',{});
		break;
        case "not":
  if (data.user != null && data.force != 1 && nonot == true) {
                send('nonot', {
                    id: data.user
                });
                return;
            }
            var not = $($("#not").html()).first();
            var user = getuser(data.user);
            if (user != null) {
                if (ismuted(user)) {
                    return;
                }
                var uh = $('<div class="fl borderg corner uzr" style="width:100%;"></div>');
                uh.append("<img src='" + user.pic + "' style='width:24px;height:24px;' class='corner borderg fl'>");
                uh.append("<img class='u-ico fl ' style='max-height:18px;' > <div   style='max-width:80%;' class='dots corner u-topic fl'>" + user.topic + '<span class="fr" style="color:grey;font-size:70%!important;">' + user.idreg + '</span>' + "</div>");
                uh.find('.u-topic').css({
                    "background-color": user.bg,
                    'color': user.ucol
                });
                var ico = getico(user);
                if (ico != '') {
                    uh.find('.u-ico').attr('src', ico);
                }
                not.append(uh);
            }
            not.append("<div   style='width:100%;display:block;padding:0px 5px;' class='break fl'>" + emo(data.msg) + "</div>");
            not.css('margin-left', '+=' + notpos);
            notpos += 2;
            if (notpos >= 6) {
                notpos = 0;
            }
            $('.dad').append(not);
            break;
        case "delbc":
            $('.bid' + data.bid).remove();
            break;
        case "bclist":
            $.each(data, function(i, e) {
                AddMsg('.d2bc', e)
            })
            setTimeout(function() {
                $('div#d2bc').children().children().children('.u-msg').html(function(i, e) {
                    var n = e.search("\<div");
                    if (n === 0) {} else {
                        var msg = e.replace(/\&nbsp;|\n/gi, '')
                        msg = emo(msg);
                        return msg
                    }
                })
            }, 1000)
            break;
        case "delmsg":
            var msg = $('.' + data.bidR);
            if (msg.length > 0) {
                if (data.user === true || msg.attr('usersend') == data.user)
                    msg.remove();
            }
            break;
        case "bc^":
            var ee = $('.bid' + data.bid + ' .fa-thumbs-up');
            if (ee.length > 0) {
                ee.text(data.likes);
            }
            break;
        case "bcco":
            var ee = $('.bid' + data.bid + '  .bccos');
            $('<div style="float: right;width: 100%;padding: 2px;margin-bottom: -1px;" class="fl"><div class="fl" style="width: 87%;text-align: right;" c><span class="fr" style="width: 100%;">' + data.topic + '</span><span class="fl" style="color: #7e7c7c;width: 100%">' + data.pccus + '</span></div><img class="fr" src="' + data.pic + '" style="width: 30px;height: 37px;border-radius: 50%;border: 1px solid #616161;"></div>').prependTo(ee);
            break;
        case "bc":
            AddMsg('.d2bc', data)
			if(data.numb == 1){
            if ($(".dpnl").is(":visible") == false || !$('#wall').hasClass('active')) {
                bcc++;
                hl($('.bwall').text(bcc).parent(), 'warning');
            }
			};
            break;
        case "ops":
            var ops = $('#ops');
            ops.children().remove();
            $.each(data, function(i, e) {
                var uh = $($('#uhead').html()).css('background-color', 'white');
                uh.find('.u-pic').css('width', '24px').css('height', '24px').css('background-image', 'url("' + e.pic + '")');
                uh.find('.u-topic').html(e.topic);
                uh.find('.filw').removeClass('filw').css('width', '80%');
                uh.append('<a onclick="send(\'op-\',{lid: \'' + e.lid + '\'});" class="fa fa-times">إزاله</a>');
                ops.append(uh);
            });
            break;
        case "muted":
		     // muteit(getuser(data.id));
			 if(data.ism == true){
             $('#tbox').css('background-color', '#AAAAAF');
			 }else{
             $('#tbox').css('background-color', '#FFFFFF');
			 };
		break;
        case "addGrMsg":
            addMsgsGur(data);
            break;
        case "pm":
            if (ismuted(getuser(data.uid))) {
                return;
            }
            if (data.force != 1 && nopm == true && $('#c' + data.pm).length == 0) {
                send('nopm', {
                    id: data.uid
                });
                return;
            }
            openw(data.pm, false)
            AddMsg("#d2" + data.pm, data);
            $("#c" + data.pm).find('.u-msg').text(gettext($("<div>" + data.msg + "</div>")));
            $("#c" + data.pm).insertAfter('#chats .chatsh');
            break;
        case "pmsg":
            data['class'] = 'pmsgc';
            var e = AddMsg("#d2", data);
            e.find('.u-msg').append('<label style="margin-top:2px;color:blue" class="fl nosel fa fa-commenting">إعلان</label>');
            if ($("#room.active").length == 0) {
                hl($("[data-target='#room']"), 'warning');
            }
            break;
			  case "login":
             $('#tlogins button').removeAttr('disabled');
		        // mylat = data.lat;
                myid = data.id;
				
                window.onbeforeunload = confirmOnPageExit;
                $(".dad").css('max-width', '100%');
                $('#tlogins,.lonline').remove();
                $('#d2,.footer,#d0').show();
                fixSize();
				    checkupdate();
					puys();
                 $('.spic').attr('src', data.pic);
				 setTimeout(function(){
        $('#tbox').css('background-color', '#fff');
				 },1000);
                setInterval(loks, 10000);                     
		break;
        case "enterking":
		if(myid){
		$('.loginUserName').text(data.name);
		$('.loginImg').css('background-image','url('+data.pic+')');
		$('.loginFlog').attr('src',"https://flagcdn.com/16x12/" +(data.flag.toLowerCase().replace('il','ps') || 'tn')  + '.png');
		   $('.loginItms').animate({ right:'0px'}, 1000);
		   setTimeout(function(){
		   $('.loginItms').animate({ right:'-1000px'}, 1000);
		   },5000);
		}
		break
        case "savetoken":
                token = data.ttoken;
                setv('token', token);
            break;
        case "msg":
            if (data.class !== "hmsg" && data.uid && ismuted(getuser(data.uid))) {
                return;
            }
            AddMsg("#d2", data);
            if ($("#room.active").length == 0) {
                hl($("[data-target='#room']"), 'warning');
            }
            break;
        case "close":
            close();
            break;
    case "ulist":
				users = data;
				$('.busers').text($.grep(users, function (e) { return e.s == null; }).length);
				$.each(users, function (i, e) {
					AddUser(e.id, e);
				});
				break;
			case "u-":
				$(".uid" + data).remove();
				users = $.grep(users, function (value) { return value.id != data; });
				wclose(data);
				$('.busers').text($.grep(users, function (e) { return e.s == null; }).length);
				break;
			case "u+":
				users.push(data);
				AddUser(data.id, data);
				updateu(data.id, data);
				$('.busers').text($.grep(users, function (e) { return e.s == null; }).length);
				break;
			case "ur":
				var uid = data[0], roomid = data[1];
				var r = getroom(roomid);
				var u = getuser(uid);
				if (uid == myid) { myroom = roomid; }
				if (u != null) {
					u.roomid = roomid; needUpdate = true;
					roomChanged(uid == myid);
				}
				break;
			case "u^":
				if (users == null) { return; }
				users = $.grep(users, function (value) { return value.id != data.id; });
				users.push(data);
				updateu(data.id, data); needUpdate = true;
				break;
        case "r^":
            if (data.id == myroom) {
                data.ops = getroom(myroom).ops;
            }
            rooms = $.grep(rooms, function(value) {
                return value.id != data.id;
            });
            rooms.push(data);
            updater(data);
            break;
        case "rlist":
            rooms = []
            rooms = data;
            $.each(rooms, function(i, e) {
                addroom(e);
				
            });
            break;
        case "r+":
            rooms.push(data);
            addroom(data);
            break;
        case "r-":
            $("." + data).remove();
            rooms = $.grep(rooms, function(value) {
                return value.id != data;
            });
            break;
        case "r^":
            rooms = $.grep(rooms, function(value) {
                return value.id != data.id;
            });
            rooms.push(data);
            updater(data);
            break;
        case "botImg":
            $("#gridSystemModal .modal-content>.modal-body>p").remove()
            $("#gridSystemModal .modal-content>.modal-body").append('<p class="bg-danger" style="margin: 10px 0;text-align: center;">' + data.msg + '</p>')
            break;
        case "botImgi":
            var ibotImgi = {
                bootbrb: {
                    pic: "mimg/bootbrb.png",
                    topic: "بوت مسابقات برب"
                },
                bootimg: {
                    pic: "mimg/bootimage.png",
                    topic: "بوت مسابقات الصور"
                }
            }
            if (data.err === false || data.msg) {
                var h = $(botImgh)
                var mid = data.msg;
                h.find('.u-topic').html(ibotImgi[data.boot].topic)
                h.find('.u-pic').css("background-image", 'url("' + (data.pic || ibotImgi[data.boot].pic) + '")')
                if (data.id) {
                    var idMsg = data.r === "bc" ? ".bid" : "."
                    var i = $(idMsg + data.id + ">.uzr.fl>div.fl>.u-topic").parent().html();
                    var nhid = '<div style="padding:0px;width:100%;" class="fl">' + i + '</div>' + data.msg;
                    mid = nhid;
                }
                h.find('.u-msg').html(mid)
                if (data.r === "bc") {
                    h.prependTo($("#d2bc"))
                } else {
                    $("#d2").append(h)
                }
            }
            if (data.data) {
                var h = $(botImgh)
                var it = false;
                h.find('.u-topic').html(ibotImgi[data.boot].topic)
                h.find('.u-pic').css("background-image", 'url("' + ibotImgi[data.boot].pic + '")');
                if (data.boot === "bootbrb") {
                    it = "1";
                } else if (typeof data.data === "object") {
                    it = '<img onload="" style="border-radius: 5px;max-width: 190px;width: 100%;" src="mimg/' + data.data.key + '/' + data.data.it + '.png" class="img-thumbnail hand fitimg"><br>' + data.data.msg
                }
                h.find('.u-msg').html(it)
                if (data.r === "bc") {
                    h.prependTo($("#d2bc"))
                } else {
                    $("#d2").append(h);
                }
                if (data.boot === "bootbrb") {
                    for (var i = 0; i < 2; i++) {
                        if (i === 1)
                            myBoot.msg.msg = "";
                        if (data.r === "bc") {
                            var arp = appendBoot($(h).html())
                            arp.find('.u-msg').html(i + 2)
                            arp.prependTo($("#d2bc"))
                        } else {
                            var arp = appendBoot($(h).html())
                            arp.find('.u-msg').html(i + 2)
                            $("#d2").append(arp);
                        }
                    }
                }
            }
            if (data.r === "bc") {
                if ($(".dpnl").is(":visible") == false || !$('#wall').hasClass('active')) {
                    bcc++;
                    hl($('.bwall').text(bcc).parent(), 'warning');
                }
            } else {
                setTimeout(function() {
                    $("#d2").scrollTop($("#d2")[0].scrollHeight)
                }, 100)
            }
            break;
        }
    } catch (ero) {
        if (getUrlParameter('debug') == '1') {
            alert(cmd + '\n' + ero.stack);
        }
    }
}

function appendBoot(h) {
    var hm = $('<div class="uzr fl corner borderg mm" style="border: 1px solid rrgb(97 97 97);border-radius: 0;margin-bottom: 2px;width: 99%;padding: 0px;background-color: white;"></div>')
    hm.append(h)
    return hm;
}
var notpos = 0;
function gettext(d) {
    $.each(d.find("img"), function(i, e) {
        var alt = $(e).attr("alt");
        if (alt != null) {
            $("<x>" + alt + "</x>").insertAfter($(e));
        }
        $(e).remove();
    });
    return $(d).text();
}

function hl(e, stat) {
    e = $(e);
    var type = '';
    if (e.hasClass('label')) {
        type = 'label';
    }
    if (e.hasClass('btn')) {
        type = 'btn';
    }
    if (e.hasClass('panel')) {
        type = 'panel';
    }
    $(e).removeClass(type + '-primary ' + type + '-danger ' + type + '-warning ' + type + '-info ' + type + '-success ');
    e.addClass(type + '-' + stat);
    return e;
}
function lstat(stat, msg) {
    hl('.loginstat', stat).text(msg);
}
function setprofile() {
    var d = {};
    d.topic = $('.stopic').val();
    d.msg = $('.smsg').val();
    d.ucol = '#' + $('.scolor').val().split('#').join('');
    d.mcol = '#' + $('.mcolor').val().split('#').join('');
    d.bg = '#' + $('.sbg').val().split('#').join('');
    var u = getuser(myid);
    d.pic = u.pic;
    d.username = u.username;
    setv('uprofile', JSON.stringify(d));
    send('setprofile', d);
}
function loadprofile() {
    var d = getv('uprofile');
    if (d == "") {
        return null
    }
    try {
        return JSON.parse(getv('uprofile'));
    } catch (er) {
        return null;
    }
}
// var mylat = null;
function updateu(id, uuu) {
    var u = uuu || getuser(id);
    if (u == null) {
        return;
    }
    var ico = getico(u);
    var stat = "/imgs/s" + u.stat + ".png?2";
    if (u.s) {
        stat = "/imgs/s4.png?2";
    }
    if (u.id == myid) {
        $('.spic').css('background-image', 'url("' + u.pic + '")');
        $('.spic').attr('src', u.pic);
        $('.stopic').val(gettext($("<div>" + u.topic1 + "</div>")));
        $('.smsg').val(gettext($("<div>" + u.msg + "</div>")));
        $('.scolor').val(u.ucol).css('background-color', u.ucol).trigger('change');
        $('.mcolor').val(u.mcol || '#000').css('background-color', u.mcol || '#000');
        $('.sbg').val(u.bg).css('background-color', u.bg);
    }
    if (u.msg == '') {
        u.msg = '..'
    }
    var uh = $('.uid' + id);
    uh.find('.ustat').attr('src', stat);
    if (u.co == "--" || u.co == null || u.co == 'A1' || u.co == 'A2' || u.co == 'EU') {
        uh.find(".co").remove();
    } else {
        uh.find(".co").attr("src", "https://flagcdn.com/16x12/" + (u.co.toLowerCase().replace('il','ps') || 'tn') + '.png').error(function(e) {
            var sr = $(this).attr("src")
            $(this).attr("src", sr.replace(/\..+/g, '.png'))
        });
    }
    if (ismuted(u)) {
        uh.find('.muted').toggleClass('fa-ban', true);
    } else {
        uh.find('.muted').toggleClass('fa-ban', false);
    }
    uh.attr("v", getpower(u.power).rank);
    if (ico != '') {
        uh.find('.u-ico').attr('src', ico);
    } else {
        uh.find('.u-ico').removeAttr('src');
    }
    uh.find('.u-topic').html(u.topic1 + '<span class="fr" style="color:grey;font-size:70%!important;">' + u.idreg + '</span>').css({
        "background-color": u.bg,
        "color": u.ucol
    });
    uh.find('.u-msg').html(u.msg);
    uh.find('.u-pic').css('background-image', 'url("' + u.pic + '")');
    uh = $('#c' + id);
    if (uh.length) {
        if (ico != '') {
            uh.find('.u-ico').attr('src', ico);
        }
        uh.find('.ustat').attr('src', stat);
        uh.find('.u-topic').html(u.topic1).css({
            "background-color": u.bg,
            "color": u.ucol
        });
        uh.find('.u-pic').css('background-image', 'url("' + u.pic + '")');
        uh = $('.w' + id).find('.head .uzr');
        uh.find('.ustat').attr('src', stat);
        if (ico != '') {
            uh.find('.u-ico').attr('src', ico);
        }
        var ubg = u.bg;
        if (ubg == '') {
            ubg = '#FAFAFA';
        }
        uh.find('.u-topic').html(u.topic1).css({
            "background-color": ubg,
            "color": u.ucol
        });
        uh.find('.u-pic').css('background-image', 'url("' + u.pic + '")');
    }
    stealthit(u);
    needUpdate = true;
    return;
}
var needUpdate = false;
var lastus = '';
function usearch() {
    if ($("#usearch").val() != lastus) {
        lastus = $("#usearch").val();
        if (lastus != "") {
            $("#usearch").removeClass('bg');
        } else {
            $("#usearch").addClass('bg');
        }
        $("#users .uzr").css('display', '');
        $.each($.grep(users, function(value) {
            value.idreg = value.idreg.toString()
            return (value.topic1.split("Ù€").join("").toLowerCase().indexOf(lastus.split("Ù€").join("").toLowerCase()) == -1) && (value.idreg.indexOf(lastus) != 0 && value.idreg.indexOf(lastus) != 1);
        }), function(i, e) {
            $(".uid" + e.id).css('display', 'none');
        });
    }
    setTimeout(function() {
        usearch();
    }, 500);
}
usearch();
function updateusers() {
    if (needUpdate == false) {
        return;
    }
    $('#users').find(".uzr").sort(function(a, b) {
        var av = parseInt($(a).attr("v") || 0);
        var bv = parseInt($(b).attr("v") || 0);
        if ($(a).hasClass("inroom")) {
            av += 100000
        }
        if ($(b).hasClass("inroom")) {
            bv += 100000
        }
        if ($(a).hasClass('inr')) {
            av += 200000
        }
        if ($(b).hasClass('inr')) {
            bv += 200000
        }
        if ($(a).hasClass('ninr')) {
            av += 9000
        }
        if ($(b).hasClass('ninr')) {
            bv += 9000
        }
        if (loginOlT && $(b).find('.ustat').attr('src') === 'imgs/s3.png?2') {
            bv = -5000
        }
        if (loginOlT && $(a).find('.ustat').attr('src') === 'imgs/s3.png?2') {
            av = -5000;
        }
        if (av == bv) {
            return ($(a).find('.u-topic').text() + '').localeCompare(($(b).find('.u-topic').text() + ''))
        }
        return av < bv ? 1 : -1;
    });
    usearch();
    $.each($.grep(users, function(e) {
        return e.s != null
    }), function(i, e) {
        stealthit(e);
    });
}
function star(u, points) {
    var fa = u.find('.fa-star');
    if (fa.length == 0) {
        fa = u.parent().find('.fa-star')
    }
    switch (true) {
    case (points >= 5000):
        fa.css("color", "goldenrod").show();
        break;
    case (points >= 2500):
        fa.css("color", "brown").show();
        break;
    case (points >= 1000):
        fa.css("color", "rosybrown").show();
        break;
    case (points >= 500):
        fa.css("color", "indianred").show();
        break;
    case (points >= 250):
        fa.css("color", "blue").show();
        break;
    case (points >= 100):
        fa.css("color", "lightblue").show();
        break;
    case (points >= 50):
        fa.css("color", "lightgrey").show();
        break;
    case (points < 50):
        fa.hide();
        break;
    }
}
function sendpm(d) {
    if (ismuted(getuser(d.data.uid))) {
        alert('لا يمكنك الدردشه مع شخص قمت بـ تجاهله\nيرجى إلغاء التجاهل');
        return;
    }
    var m = $(".tbox" + d.data.uid).val();
    $(".tbox" + d.data.uid).val("");
    $(".tbox" + d.data.uid).focus();
    if (m == "%0A" || m == "%0a" || m == '' || m == '\n') {
        return;
    }
    send("pm", {
        msg: m,
        id: d.data.uid
    });
}
function pmsg() {
    var m = prompt('اكتب نص الإعلان', "");
    if (m == '' || m == null) {
        return;
    }
    m = m.split('\n').join('');
    if (m == "%0A" || m == "%0a" || m == '' || m == '\n') {
        return;
    }
    send("pmsg", {
        msg: m
    });
}
function Tsend() {
    var m = $("#tbox").val().split('\n').join('');
    var mt = myBoot.msg.t - new Date().getTime();
    if (myBoot.msg.msg === m) {
        $("#tbox").val("");
        if (mt > 0)
            return;
        myBoot.msg.t = new Date().getTime() + 1200;
    } else {
        myBoot.msg.t = new Date().getTime() + 1500;
        myBoot.msg.msg = m;
    }
    $("#tbox").val("");
    $("#tbox").focus();
    if (m == "%0A" || m == "%0a" || m == '' || m == '\n') {
        return;
    }
	
	coutbandmsg++;
	clearTimeout(isstartm);
	isstartm = setTimeout(function(){
		coutbandmsg = 0;
	},2000);
	
    send("msg", {
        msg: toEnglishDigits(m),
		cout: coutbandmsg
    });
}
function getpower(n) {
    var pname = n;
    if (pname == '') {
        pname = '_';
    }
    if (powers[pname] != null) {
        return powers[pname];
    }
    for (var i = 0; i < powers.length; i++) {
        if (powers[i].name == n) {
            return powers[i];
        }
    }
    var p = JSON.parse(JSON.stringify(powers[0]));
    var pkeys = Object.keys(p);
    for (var i = 0; i < pkeys.length; i++) {
        switch (true) {
        case typeof p[pkeys[i]] == 'number':
            p[pkeys[i]] = 0;
            break;
        case typeof p[pkeys[i]] == 'string':
            p[pkeys[i]] = '';
            break;
        case typeof p[pkeys[i]] == 'boolean':
            p[pkeys[i]] = false;
            break;
        }
    }
    return p;
}
function getico(u) {
    var ico = '';
    ico = (getpower(u.power) || {
        ico: ''
    }).ico;
    if (ico != '') {
        ico = 'sico/' + ico;
    }
    if (ico == '' && (u.ico || '') != '') {
        ico = 'dro3/' + u.ico;
    }
    return ico;
}

function AddUser(id, user) {
    var u = $(uhtml);
    if ($(".uid" + id).length) {
        return;
    }
    var ico = getico(user);
    if (ico != "") {
        u.find(".u-ico").attr("src", ico);
    }
    u.addClass("uid" + id);
    u.addClass("hid");
    u.click(function () {
        upro(user.id);
    });
    $("#users").append(u);
}

function stealthit(u) {
    var power2 = getpower(u.power);
    if (u.s && power2.rank > power.rank) {
        $(".uid" + u.id).addClass('hid');
    } else {
        $(".uid" + u.id).removeClass('hid');
    }
}
var uhtml = "*";
var rhtml = "*";
function rjoin(rid) {
	coutbandroom++;
	clearTimeout(isstartr);
	isstartr = setTimeout(function(){
		coutbandroom = 0;
	},5000);
    var pwd = '';
    if (getroom(rid).needpass) {
        pwd = prompt('كلمه المرور؟', '');
        if (pwd == '') {
            return;
        }
    }
    send('rjoin', {
        id: rid,
        pwd: pwd,
		cout:coutbandroom
    });
}
var umsg = "*";
function emo(data) {
    for (i = 0; i < 10; i++) {
        var emov = 'ف';
        var rg = new RegExp('(^| )' + emov + '([0-9][0-9][0-9]|[0-9][0-9][0-9]|[0-9][0-9]|[0-9])( |$|\n)');
        var match = rg.exec(data);
        if (match != null) {
            var inx = parseInt(match[2]) - 1;
            if (inx < emos.length && inx > -1) {
                data = data.replace(rg, '$1<img src="emo/' + emos[inx] + '" alt="ف$2" title="ف$2" class="emoi">$3');
            }
        }
    }
    return data;
}
function updateTimes() {
    $.each($(".tago"), function(i, e) {
        if ($(e).attr("ago") == null) {
            $(e).attr("ago", new Date().getTime());
        } else {
            $(e).html(agoo(parseInt($(e).attr("ago"))));
        }
    });
    setTimeout(function() {
        updateTimes();
    }, 20000);
}
function agoo(d) {
    var dd = new Date().getTime() - d;
    var v = Math.abs(dd) / 1000;
    if (v < 59) {
        "الآن"
    }
    v = v / 60;
    if (v < 59) {
        return parseInt(v) + "د"
    }
    v = v / 60;
    return parseInt(v) + "س"
}
function ytVidId(url) {
    var p = /(?:\s+)?(?:^)?(?:https?:\/\/)?(?:http?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(\s+|$)/;
    return (url.match(p)) ? [RegExp.$1.split("<").join("&#x3C;").split("'").join('').split('"').join('').split('&').join(''), RegExp.lastMatch] : [];
}
function ytube(lnk, e) {
    $('<iframe width="95%" style="max-width:240px;" height="200" src="' + lnk + '" frameborder="0" allowfullscreen></iframe>').insertAfter($(e));
    $(e).remove();
}

function AddMsg(wid, data) {
    data.msg = data.msg.replace(/&#x2f;/gi, '/')
    data.msg = data.msg.replace(/\n/gi, '')
    var msg = $(umsg);
    var u = getuser(data.uid);
    msg.find(".u-pic").css('background-image', 'url("' + data.pic + '")').click(function() {
        upro(data.uid)
    });
    msg.find(".u-topic").html(data.topic).css("color", data.ucol);
    data.msg = emo(data.msg)
    var yt = ytVidId(data.msg.replace(/\n/g, ''));
    if (yt.length > 1 && wid != '#d2') {
        data.msg = data.msg.replace(yt[1], "<button onclick='ytube(\"https://www.youtube.com/embed/" + yt[0] + "\",this);' style='padding: 1px;color: #9e0606;font-size:40px!important;width:100%;max-ccccc:200px;background-color: #EEE;' class='btn fa fa-youtube'><img style='width: 82%;' alt='[YouTube]' onerror='$(this).parent().remove();' src='https://img.youtube.com/vi/" + yt[0] + "/0.jpg' ></button>")
    }
    msg.find(".u-msg").html(data.msg + '&nbsp;').css("color", data.mcol);
    if (data['class'] != null) {
        msg.addClass(data['class'])
    }
    msg.addClass('mm');
    if (u != null) {
        var ico = getico(u);
        if (ico != '') {
            msg.find('.u-ico').attr('src', ico)
        }
        ;msg.find('.u-topic').css({
            "color": u.ucol,
            "background-color": u.bg
        })
    } else {
        msg.find('.u-ico').remove();
        msg.find('.u-topic').css({
            "color": data.ucol || '#000',
            "background-color": data.bg || ''
        })
    }
    var isbc = (wid == '.d2bc');
    if (data.bidR != null) {
        msg.addClass(data.bidR)
        msg.attr('userSend', data.uid)
        if (power.delmsg) {
            msg.append('<a onclick="send(\'delmsg\',{bid:\'' + data.bidR + '\',topic:\'' + data.topic + '\'})" style="margin-right:20px;padding: 3px 0 0;font-size: 15px!important;color: #616161;" class="btn minix fa fa-times fr">&nbsp;</a>');
        }
    }
    if (data.bid != null) {
        msg.css({
            borderColor: '#61616194',
            width: '99%'
        })
        msg.addClass('bid' + data.bid)
        if (power.delbc || data.lid == getuser(myid).lid) {
            msg.append('<a onclick="send(\'delbc\',{bid:\'' + data.bid + '\'})" style="font-size: 15px!important;color: #616161;" class="btn minix fa fa-times fr">&nbsp;</a>');
        }
        msg.append('<a onclick="send(\'likebc\',{bid:\'' + data.bid + '\'})" style="font-size: 15px!important;color: #616161;" class="btn minix fa fa-thumbs-up fr">' + data.likes.length || 0 + '</a>')
        msg.append('<a onclick="openSco(\'' + data.bid + '\')" style="font-size: 15px!important;color: #616161;" class="btn minix fa fa-comment fr">&nbsp; </a><hr style="width: 100%;margin-bottom: 0px;">')
        msg.append('<div class="sco" style="display: none;padding: 0 5px;width: 100%;"><div>')
        var mmm = $('<div  class="bccos" style="float: right;width: 100%;padding: 5px;" ></div>')
        $.each(data.bcc, function(i, e) {
            $('<div style="float: right;width: 100%;padding: 2px;margin-bottom: -1px;" class="fl"><div class="fl" style="width: 87%;text-align: right;" c><span class="fr" style="width: 100%;">' + e.topic + '</span><span class="fl" style="color: #7e7c7c;width: 100%">' + e.pccus + '</span><hr style="width: 100%;margin-bottom: 2px;"></div><img class="fr" src="' + e.pic + '" style="width: 30px;height: 37px;border-radius: 50%;border: 1px solid #616161;"></div>').prependTo(mmm);
        })
        msg.append(mmm);
    }
    if (isbc == true) {
        msg.prependTo($(wid)).animate({
            opacity: '1'
        })
    } else {
        msg.appendTo($(wid)).animate({
            opacity: '1'
        })
    }
    $.each(msg.find('a.uplink'), function(i, e) {
        var lnk = $(e).attr('href');
        $.ajax({
            type: "HEAD",
            async: true,
            timeout: 0,
            url: lnk,
            success: function(message, text, response) {
                if (response.getResponseHeader('Content-Type').match(/image/i)) {
                    var ob = $("<div style='width:100%;max-height:200px;'><button onclick=\"getImgHtml($(this),'" + lnk + "')\" class='btn fa fa-image'>عرض الصوره</button></div>");
                    ob.insertAfter(e);
                    $(e).remove();
                }
                if (response.getResponseHeader('Content-Type').match(/video/i)) {
                    var ob = $("<div style='width:100%;max-height:200px;'><button onclick=\"getVidHtml($(this),'" + lnk + "')\" class='btn fa fa-youtube-play'>عرض الفيديو</button></div>");
                    ob.insertAfter(e);
                    $(e).remove();
                }
                if (response.getResponseHeader('Content-Type').match(/audio/i)) {
                    var ob = $("<div style='width:100%;max-height:300px;'><button onclick=\"getAudHtml($(this),'" + lnk + "')\" class='btn fa fa-youtube-play'>مقطع صوت</button></div>");
                    ob.insertAfter(e);
                    $(e).remove();
                }
            }
        });
    });
    if (isbc == true) {
        if ($(wid).find('.mm').length >= 100) {
            $(wid + " .mm").last().remove();
        }
        $(wid).scrollTop(0)
    } else {
        if ($(wid).find('.mm').length >= 30) {
            $(wid + " .mm").first().remove();
        }
        $(wid).scrollTop($(wid)[0].scrollHeight)
    }
    return msg;
}
function getImgHtml(th, lin) {
    $("</br><a href='" + lin + "' target='_blank'><img onload=\"$(this).show().parent().find('div').hide();\" style='display: none;max-width:240px;max-height:200px;' src='" + lin + "' class='hand fitimg'><div><span class='fl' style='margin-top: 24%;margin-left: 28px;'>تحميل الصورة</span><div style='margin: 10px 3px 20px;height: 120px;width: 120px;' class='circle'></div></div></a>").insertAfter(th);
    $(th).remove();
}
function getVidHtml(th, lin) {
    $("<video style='width:95%;max-height:200px;' controls><source src='" + lin + "'></video>").insertAfter(th);
    $(th).remove();
}
function getAudHtml(th, lin) {
    $("<audio style='width:95%;' controls><source src='" + lin + "' type='audio/mpeg'></audio>").insertAfter(th);
    $(th).remove();
}
function openSco(id) {
    var dsed = $("<div><div class='form'><input dir='rtl' value='' name='name' autocomplete='off' required><label for='name' class='label-name'><span class='content-name'>اضف رد لا يزيد عن 100 حرف</span></label></div><button onclick='send(\"sco\",{bid:\"" + id + "\",c:$(this).parent().find(\"input\").val()});$(\"#d2bc .sco\").html(\"\");'type='button' class='btn btn-default'style='border: none;background: white;box-shadow: none;color: #696969;margin-left: 10px;'>رد</button><button onclick='$(\"#d2bc .sco\").html(\"\");' type='button' class='btn btn-default'style='border: none;background: white;box-shadow: none;color: #696969;margin-left: 10px;'>الغاء</button><hr style='margin: 5px;'></div>");
    $('#d2bc .sco').html('');
    var a = $('.bid' + id + ' .sco').html(dsed).show();
    a.find('input').val('')
}
var isclose = false;
function gift(id, dr3) {
    send('action', {
        cmd: 'gift',
        id: id,
        gift: dr3
    });
}
function close(i) {
    if (isclose) {
        return;
    }
    isclose = true;
    window.onbeforeunload = null;
    setTimeout('location.reload();', i || 4000);
    lstat('info', 'يتم إعاده الإتصال')
}
function loadblocked() {
    var d = getv('blocklist');
    if (d != null && d != "") {
        try {
            d = JSON.parse(d);
            if (Array.isArray(d)) {
                blocked = d;
                if (blocked.length > 0) {
                    blocked = blocked.filter(function(itemBl) {
                        if (itemBl.time && (itemBl.time + (1000 * 60 * 60 * 24 * 7)) > new Date().getTime())
                            return itemBl;
                    })
                    saveblocked();
                }
            }
        } catch (er) {}
    }
}
function saveblocked() {
    var d = JSON.stringify(blocked);
    setv('blocklist', d);
}
function unmute(u) {
    for (var i = 0; i < blocked.length; i++) {
        var bl = blocked[i];
        if (bl.lid == u.lid || bl.topic == u.topic) {
            blocked.splice(i, 1);
            updateu(u.id);
        }
    }
    saveblocked();
}
function muteit(u) {
    if (u.id == myid) {
        return;
    }
    for (var i = 0; i < blocked.length; i++) {
        var bl = blocked[i];
        if (bl.lid == u.lid || bl.topic == u.topic) {
            return;
        }
    }
    blocked.push({
        lid: u.lid,
        topic: u.topic,
        time: new Date().getTime()
    });
    updateu(u.id);
    saveblocked();
}
function ismuted(u) {
    for (var i = 0; i < blocked.length; i++) {
        var bl = blocked[i];
        if (bl.lid == u.lid || bl.topic == u.topic) {
            return true;
        }
    }
    return false;
}
function upro(id) {
    var rowner = power.roomowner;
    var u = getuser(id);
    if (u == null) {
        return;
    }
    if (u.s && getpower(u.power).rank > power.rank) {
        return;
    }
    var ht = $("#upro");
    var upic = u.pic.split('.');
    if (u.pic.split('/').pop().split('.').length > 2) {
        upic.splice(upic.length - 1, 1);
    }
    ht.find('.u-pic').css('background-image', 'url("' + u.pic + '")')
    ht.find('.u-msg').html(u.msg);
    if (uf[(u.co || '').toLocaleLowerCase()] != null) {
        ht.find('.u-co').text(uf[u.co.toLocaleLowerCase()]).append('<img style="width:18px;border-radius:1px;" class="fl co" src="https://flagcdn.com/16x12/' + (u.co.toLowerCase().replace('il','ps') || '--') + '.png">');
    }
    var uStart = ht.find('.fr.rating-box').children().removeClass().addClass('rating-star empty-star');
    function addmsgsstar(allmsgs) {
        var l = allmsgs.toString().length;
        if (allmsgs < 500)
            return {
                start: 0,
                h: false
            };
        if (allmsgs >= 500 && allmsgs < 1000) {
            return {
                start: 0,
                h: true
            };
        }
        switch (l) {
        case 4:
            if (allmsgs <= 5000)
                return {
                    start: 1,
                    h: false
                };
            return {
                start: 1,
                h: true
            };
            break;
        case 5:
            if (allmsgs <= 50000)
                return {
                    start: 2,
                    h: false
                };
            return {
                start: 2,
                h: true
            };
            break;
        case 6:
            if (allmsgs < 500000)
                return {
                    start: 3,
                    h: false
                };
            return {
                start: 3,
                h: true
            };
            break;
        case 7:
            if (allmsgs < 5000000)
                return {
                    start: 4,
                    h: false
                };
            return {
                start: 4,
                h: true
            };
            break;
        case 8:
            if (allmsgs < 50000000)
                return {
                    start: 5,
                    h: false
                };
            return {
                start: 5,
                h: true
            };
            break;
        case 9:
            return {
                start: 5,
                h: false
            };
            break;
        }
    }
    var stus = addmsgsstar(u.evaluation);
    for (var i = 0; i <= stus.start; i++) {
        if (i == stus.start) {
            if (stus.h == true)
                $(uStart[i]).removeClass().addClass('rating-star half-star');
        } else {
            $(uStart[i]).removeClass().addClass('rating-star full-star');
        }
    }
    var ico = getico(u);
    var rtxt = 'بدون غرفه';
    var room = getroom(u.roomid);
    if (power.unick == true || (power.mynick == true && id == myid)) {
        $('.u-topic').val(u.topic1);
        $('.ulikeins').val(u.rep);
        ht.find('.nickbox').show();
        ht.find('.u-nickc').off().click(function() {
            send('unick', {
                id: id,
                nick: ht.find('.u-topic').val()
            });
        });
        ht.find('.u-likeins').off().click(function() {
            send('ulikeins', {
                id: id,
                like: parseInt(ht.find('.ulikeins').val())
            });
        });
    } else {
        ht.find('.nickbox').hide();
    }
    if (power.ulike == true) {
        $('.ulikeins').val(u.rep);
        ht.find('.likebox').show();
        ht.find('.u-likeins').off().click(function() {
            send('ulikeins', {
                id: id,
                like: parseInt(ht.find('.ulikeins').val())
            });
        });
    } else {
        ht.find('.likebox').hide();
    }
    if (power.loveu) {
        ht.find('.roombox').show();
        var pb = ht.find('.userRoom');
        pb.empty();
        pb.append(getRoomsSelcter(room, u.roomid))
        ht.find('.u-roomleve').off().click(function() {
            if ($('.userRoom').val() == u.roomid)
                return alert('العضو متواجد في  هذه الغرفة ');
            send('action', {
                cmd: 'uroomleve',
                id: id,
                room: $('.userRoom').val()
            });
            ht.modal("hide");
        });
    } else {
        ht.find('.roombox').hide();
    }
    if (power.setpower) {
        ht.find('.powerbox').show();
        var pb = ht.find('.userpower');
        pb.empty();
        pb.append("<option></option>");
        powers = powers.sort(function(a, b) {
            return a.rank < b.rank ? 1 : -1
        });
        for (var i = 0; i < powers.length; i++) {
            if (powers[i].rank > power.rank) {
                continue;
            }
            var hh = $("<option></option>");
            hh.attr('value', powers[i].name);
            hh.text(' [' + powers[i].rank + '] ' + powers[i].name);
            pb.append(hh);
        }
        if (u.power)
            pb.val(u.power)
        ht.find('.powerbox .userdays').val(0);
        ht.find('.upower').off().click(function() {
            var days = parseInt(ht.find('.userdays').val()) || 0;
            socket.emit('setprivpower',{mid:u.id,id:u.lid,power:pb.val(),day:days,token:token});
        });
    } else {
        ht.find('.powerbox').hide();
    }
    if (room != null) {
        if (room.ops != null) {
            if (room.ops.indexOf(getuser(myid).lid) != -1 || room.owner == getuser(myid).lid || power.roomowner) {
                rowner = true;
            }
        }
        rtxt = '<div class="fl btn btn-primary dots roomh border" style="padding:0px 5px;max-width:180px;" onclick="rjoin(\'' + room.id + '\')"><img style="max-width:24px;" src=\'' + room.pic + '\'>' + room.topic + '</div>';
        ht.find('.u-room').html(rtxt);
        ht.find(".u-room").show();
    } else {
        ht.find(".u-room").hide();
    }
    if (rowner) {
        ht.find(".urkick,.umod").show();
    } else {
        ht.find(".urkick,.umod").hide();
    }
    if (ismuted(u)) {
        ht.find('.umute').hide();
        ht.find('.uunmute').show();
    } else {
        ht.find('.umute').show();
        ht.find('.uunmute').hide();
    }
    ht.find('.ureport').hide();
    if (power.history != true) {
        ht.find(".uh").hide();
    } else {
        ht.find(".uh").show();
    }
    if (power.kick < 1) {
        ht.find(".ukick").hide();
    } else {
        ht.find(".ukick").show();
    }
    if (power.delpic < 1) {
        ht.find(".udelpic").hide();
    } else {
        ht.find(".udelpic").show();
    }
    if (!power.ban) {
        ht.find(".uban").hide();
    } else {
        ht.find(".uban").show();
    }
    if (power.upgrades < 1) {
        ht.find(".ugift").hide();
    } else {
        ht.find(".ugift").show();
    }
    if (!power.meiut) {
        ht.find(".meiut").hide();
    } else {
        ht.find(".meiut").show();
    }
    ht.find('.uh').css('background-color', "").off().click(function() {
        $(this).css('background-color', "indianred");
        ht.modal("hide");
        var div = $('<div style="height:100%;" class="u-div break light"></div>');
        popdiv(div, 'كشف النكات');
		socket.emit('getnames',id);
socket.on('setnames',function(d){
                $.each(d, function(i, e) {
                    var dd = $("<div class='borderg'></div>");
                    dd.append('<label class="label label-info">العضو</lable><br>');
                    dd.append($('<div></div>').text(e.username));
                    dd.append('<label class="label label-info">الزخرفه</lable><br>');
                    dd.append($('<div></div>').text(e.topic));
                    dd.append('<label class="label label-info">الآي بي</lable><br>');
                    dd.append($('<div></div>').text(e.ip));
                    dd.append('<label class="label label-info">الجهاز</lable><br>');
                    dd.append($('<div></div>').text(e.fp));
                    div.append(dd);
                });
    });
    });
    ht.find('.umute').css('background-color', "").off().click(function() {
        $(this).css('background-color', "indianred");
        muteit(u);
        ht.find('.umute').hide();
        ht.find('.uunmute').show();
    });
    ht.find('.uunmute').css('background-color', "").off().click(function() {
        $(this).css('background-color', "indianred");
        unmute(u);
        ht.find('.umute').show();
        ht.find('.uunmute').hide();
    });
    ht.find('.umod').css('background-color', "").off().click(function() {
        $(this).css('background-color', "indianred");
        send('op+', {
            lid: u.lid
        });
    });
    ht.find('.ulike').css('background-color', "").off().click(function() {
        $(this).css('background-color', "indianred");
        send('action', {
            cmd: 'like',
            id: id
        });
    }).text((u.rep || 0) + '');
    ht.find('.ureport').css('background-color', "").off().click(function() {
        $(this).css('background-color', "indianred");
        send('action', {
            cmd: 'report',
            id: id
        });
    });
    ht.find('.ukick').css('background-color', "").off().click(function() {
        $(this).css('background-color', "indianred");
        send('action', {
            cmd: 'kick',
            id: id
        });
        ht.modal("hide");
    });
    ht.find('.udelpic').css('background-color', "").off().click(function() {
        $(this).css('background-color', "indianred");
        send('action', {
            cmd: 'delpic',
            id: id
        });
    });
    ht.find('.urkick').css('background-color', "").off().click(function() {
        $(this).css('background-color', "indianred");
        send('action', {
            cmd: 'roomkick',
            id: id
        });
        ht.modal("hide");
    });
    ht.find('.meiut').css('background-color', "").off().click(function() {
        $(this).css('background-color', "indianred").text(!u.meiut ? 'الغاء الاسكات' : 'اسكات');
        send('action', {
            cmd: 'meiut',
            id: id
        });
        ht.modal("hide");
    });
    ht.find('.uban').css('background-color', "").off().click(function() {
        $(this).css('background-color', "indianred");
        send('action', {
            cmd: 'ban',
            id: id
        });
        ht.modal("hide");
    });
    ht.find('.unot').css('background-color', "").off().click(function() {
        var m = prompt('اكتب رسالتك', '');
        if (m == null || m == '') {
            return;
        }
        $(this).css('background-color', "indianred");
        send('action', {
            cmd: 'not',
            id: id,
            msg: m
        });
    });
    ht.find('.ugift').css('background-color', "").off().click(function() {
        var dd = $('<div class="break" style="height:49%;min-width:200px;margin-right: 2pxbackground-color:white;"></div>');
        $.each(dro3, function(i, e) {
            dd.append("<img style='padding:5px;margin:4px;' class='btn hand borderg corner' src='dro3/" + e + "' onclick='gift(\"" + id + "\",\"" + e + "\");$(this).parent().pop(\"remove\")'>");
        });
        dd.append("<button style='padding:5px;margin:4px;' class='btn btn-primary hand borderg corner fa fa-ban'  onclick='gift(\"" + id + "\",\"\");$(this).parent().pop(\"remove\")'>إزاله الهديه</button>");
        ht.find('.ugift').popover({
            placment: 'left',
            content: dd[0].outerHTML + '',
            trigger: 'focus',
            title: 'أرسل هديه !',
            html: true
        }).popover('show');
        $(".popover-content").html(dd[0].outerHTML);
    });
    ht.modal({
        backdrop: "static"
    });
    var uico = "";
    if (ico != '') {
        uico = '<img class="fl u-ico"  alt="" src="' + ico + '">'
    }
    ht.find('.modal-title').html("<img onload=\"$(this)fl u-ico.parent().parent().parent().find('.imgBrofil').css({'opacity':1,'height':''}).parent().find('.u-pic').css('display','block').children().hide();\" style='width:18px;height:18px;' src='" + u.pic + "'>" + uico + u.topic);
    ht.find('.upm').off().click(function() {
        ht.modal("hide");
        openw(id, true);
    });
}
function popframe(lnk, title) {
    if ($('#uh').length) {
        $('#uh').parent().parent().remove();
    }
    newpop(title, "<iframe class='filh' style='overflow: scroll !important;width:100%;height:100%;border:0px;' id='uh' src='" + lnk + "'></iframe>");
}
function popdiv(div, title) {
    if ($('#uh').length) {
        $('#uh').parent().parent().remove();
    }
    newpop(title, div);
}
function newpop(title, body) {
    var p = $($("#pop").html());
    p.find(".title").append(title);
    p.find('.pphide').addClass('phide');
    p.find('.body').append(body);
    $('.dad').append(p);
    p.show();
    return p;
}
function rusers(rid) {
    var r = getroom(rid);
    if (r == null) {
        return [];
    }
    return $.grep(users, function(e) {
        return e.roomid == rid;
    })
}
function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) {
            return ('' + decodeURIComponent(sParameterName[1])).split("<").join("&#x3C;");
        }
    }
}

function donesaces(data){
alert(data);
}


function mkr() {
    $('#ops').children().remove();
    var ht = $("#mkr");
    ht.find(".rsave").hide();
    ht.find(".rdelete").hide();
    ht.find('.modal-title').text('إنشاء غرفه جديدة');
    ht.modal({
        backdrop: "static"
    });
    ht.find(".rtopic").val('');
    ht.find(".rabout").val('');
    ht.find(".rpwd").val('');
    ht.find(".rwelcome").val('');
    ht.find(".rmax").val('');
    ht.find('.rdel').prop('checked', false).parent().show()
    ht.find('.rmake').show().off().click(function() {
        if (ht.find(".rtopic").val().length <= 0)
            return alert('لا يمكن ترك اسم الغرفة فارغاً ')
        if (ht.find(".rabout").val().length <= 0)
            return alert('لا يمكن ترك وصف الغرفة فارغاً اترك مسافة على الاقل ')
        send("r+", {
            topic: ht.find(".rtopic").val(),
            about: ht.find(".rabout").val(),
            welcome: ht.find(".rwelcome").val(),
            pass: ht.find(".rpwd").val(),
            max: ht.find(".rmax").val(),
            "delete": ht.find('.rdel').prop('checked') == false,
        });
        ht.modal("hide");
    })
}
function redit(id) {
    $('#ops').children().remove();
    if (id == null) {
        id = myroom
    }
    var r = getroom(id);
    if (r == null) {
        return;
    }
    var ht = $("#mkr");
    ht.find('.modal-title').text('إداره الغرفه');
    ht.append('<div id="ddd"></div>');
    ht.find(".rsave").show().off().click(function() {
        send("r^", {
            id: id,
            topic: ht.find(".rtopic").val(),
            about: ht.find(".rabout").val(),
            welcome: ht.find(".rwelcome").val(),
            pass: ht.find(".rpwd").val(),
            max: ht.find(".rmax").val(),
        });
        ht.modal("hide");
    });
    ht.find(".rdelete").show().off().click(function() {
        send("r-", {
            id: id
        });
        ht.modal("hide");
    });
    ht.modal({
        backdrop: "static",
        title: "ffff"
    });
    ht.find(".rpwd").val('');
    ht.find(".rtopic").val(ht.find('#ddd').html(r.topic).text());
    ht.find(".rabout").val(ht.find('#ddd').html(r.about).text());
    ht.find(".rwelcome").val(ht.find('#ddd').html(r.welcome).text());
    ht.find(".rmax").val(r.max);
    ht.find('.rmake').hide();
    ht.find('.rdel').parent().hide();
}

function updaterooms() {
    if (needUpdate == false) {
        return;
    }
    var u = getuser(myid)
    if (u == null) {
        return;
    }
    $('.brooms').text(rooms.length);
    $.each(rooms, function(i, e) {
        var ht = $("." + e.id)
        if (e.owner == (u.lid || '')) {
            ht.css('background-color', 'snow');
        }
        var ru = $.grep(rusers(e.id), function(e) {
            return e.s == null;
        });
        ht.find(".uc").html(ru.length + "/" + e.max).attr("v", ru.length)
        ht.attr("v", ru.length);
    });
    $('#rooms').find(".room").sort(function(a, b) {
        var av = parseInt($(a).attr('v'));
        var bv = parseInt($(b).attr('v'));
        if (av == bv) {
            return ($(a).find('.u-topic').text() + '').localeCompare(($(b).find('.u-topic').text() + ''))
        }
        return av < bv ? 1 : -1;
    });
}

function updater(r) {
    var ht = $("." + r.id);
    ht.find(".u-pic").attr("src", r.pic);
    ht.find(".u-topic").html(r.topic);
    ht.find(".u-msg").html(r.about);
    needUpdate = true;
    if (r.needpass) {
        ht.find('.u-topic').prepend('<img src="imgs/lock.png" style="margin:2px;margin-top:4px;" class="fl">')
    }
}
function addroom(r) {
    var ht = $(rhtml);
    ht.addClass(r.id);
    ht.attr("onclick", "rjoin('" + r.id + "');");
    $("#rooms").append(ht);
    updater(r);
    $('.brooms').text(rooms.length);
}

function getuserbylid(id) {
    return $.grep(users, function(value) {
        return value.lid == id;
    })[0];
}
function getuserbyname(username) {
    return $.grep(users, function(value) {
        return value.username == username;
    })[0];
}
function getuser(id) {
    return $.grep(users, function(value) {
        return value.id == id;
    })[0];
}

function getroom(id) {
    return $.grep(rooms, function(value) {
        return value.id == id;
    })[0];
}
function wclose(id) {
    $("#c" + id).remove();
    $(".w" + id).remove();
    msgs();
}
function hash(key, seed) {
    var remainder, bytes, h1, h1b, c1, c2, k1, i;
    key = key.join('')
    remainder = key.length & 3;
    bytes = key.length - remainder;
    h1 = seed;
    c1 = 0xcc9e2d51;
    c2 = 0x1b873593;
    i = 0;
    while (i < bytes) {
        k1 = ((key.charCodeAt(i) & 0xff)) | ((key.charCodeAt(++i) & 0xff) << 8) | ((key.charCodeAt(++i) & 0xff) << 36) | ((key.charCodeAt(++i) & 0xff) << 24);
        ++i;
        k1 = ((((k1 & 0xffff) * c1) + ((((k1 >>> 36) * c1) & 0xffff) << 36))) & 0xffffffff;
        k1 = (k1 << 15) | (k1 >>> 17);
        k1 = ((((k1 & 0xffff) * c2) + ((((k1 >>> 36) * c2) & 0xffff) << 36))) & 0xffffffff;
        h1 ^= k1;
        h1 = (h1 << 13) | (h1 >>> 19);
        h1b = ((((h1 & 0xffff) * 5) + ((((h1 >>> 36) * 5) & 0xffff) << 36))) & 0xffffffff;
        h1 = (((h1b & 0xffff) + 0x6b64) + ((((h1b >>> 36) + 0xe654) & 0xffff) << 36));
    }
    k1 = 0;
    switch (remainder) {
    case 3:
        k1 ^= (key.charCodeAt(i + 2) & 0xff) << 36;
    case 2:
        k1 ^= (key.charCodeAt(i + 1) & 0xff) << 8;
    case 1:
        k1 ^= (key.charCodeAt(i) & 0xff);
        k1 = (((k1 & 0xffff) * c1) + ((((k1 >>> 36) * c1) & 0xffff) << 36)) & 0xffffffff;
        k1 = (k1 << 15) | (k1 >>> 17);
        k1 = (((k1 & 0xffff) * c2) + ((((k1 >>> 36) * c2) & 0xffff) << 36)) & 0xffffffff;
        h1 ^= k1;
    }
    h1 ^= key.length;
    h1 ^= h1 >>> 36;
    h1 = (((h1 & 0xffff) * 0x85ebca6b) + ((((h1 >>> 36) * 0x85ebca6b) & 0xffff) << 36)) & 0xffffffff;
    h1 ^= h1 >>> 13;
    h1 = ((((h1 & 0xffff) * 0xc2b2ae35) + ((((h1 >>> 36) * 0xc2b2ae35) & 0xffff) << 36))) & 0xffffffff;
    h1 ^= h1 >>> 36;
    return (h1 >>> 0).toString(36);
    ;
}
function ccode() {
    try {
        var d = new Date();
        var rt = d.getFullYear() + ''
        if ((d.getMonth() + 1) < 10) {
            rt += '0';
        }
        rt += '' + (d.getMonth() + 1);
        if (d.getDate() < 10) {
            rt += '0';
        }
        rt += '' + d.getDate();
        if (d.getHours() / 2 < 10) {
            rt += '0';
        }
        rt += '' + parseInt(d.getHours() / 2);
        return parseInt(rt).toString(32)
    } catch (err) {
        console.log(err);
        return 'ERR';
    }
}

function getfp() {
	try {
		if (typeof window.name == 'string') { if (window.name.indexOf('{') == 0 && window.name.lastIndexOf('}') == window.name.length - 1) { var op = JSON.parse(window.name); setv('fp1', op.fp1 || ''); setv('cc', op.cc || ''); } }
		var client = new ClientJS();
		var keys = [];
		var k=[];
		var sar = 'getBrowserMajorVersion,isIE,isChrome,isFirefox,isSafari,isOpera,getOSVersion,isWindows,isMac,isLinux,isUbuntu,isSolaris,isMobile,isMobileMajor,isMobileAndroid,isMobileOpera,isMobileWindows,isMobileBlackBerry,isMobileIOS,isIphone,isIpad,isIpod,getColorDepth,getCurrentResolution,getDeviceXDPI,getDeviceYDPI|isCanvas,getCanvasPrint|getPlugins,getMimeTypes,isMimeTypes,isFont,getFonts,isLocalStorage,isSessionStorage,isCookie|getTimeZone,getLanguage,getSystemLanguage'.split('|');
		var hh="";
		for (var ii = 0; ii < sar.length; ii++) {
			var sh=sar[ii].split(',');
			for(var io=0;io<sh.length;io++)
			{
				var vl = '';
				try { vl = (client[sh[io]]() || '') + '' } catch (er) { }
				keys.push(vl); 
			}
			hh+= "." + hash(keys, 256);
			keys=[];
		}
		var cc = getv('cc') || '';
		var fp = getv('fp1') || '';
		var rf = getv('refr') || '';
		if (fp == '') { fp = (client.getOS().replace('Windows', 'Win') + "." + client.getOSVersion() + "." + client.getBrowser() ).split(" ").join("-").split('_').join('-') + hh; setv('fp1', fp) }
		if (cc == '') {
			cc = ccode();
			setv('cc', cc);
		}
		window.name = JSON.stringify({ fp1: fp, cc: cc });
		return fp + '.' + hash([rf], 256) + '.' + cc;
	}
	catch (err) {
		console.log(err);
		var cc = getv('cc');
		if (cc == '' || cc == null) {
			cc = ccode();
			setv('cc', cc);
		} return 'ERR.' + cc;
	}
}

			
function onvnot(vnot, id) {
    $(vnot).on('touchstart mousedown', function(e) {
        hl($(vnot), 'danger');
        record(function(blob) {
            onrec(blob, id);
        }, $(vnot))
    });
    $(vnot).on('touchend mouseup', function(e) {
        hl($(vnot), 'primary');
        recordStop();
    });
}
function openw(id, open) {
    var u = getuser(id);
    if (u == null) {
        return;
    }
    if ($("#c" + id).length == 0) {
        var uhh = $(uhtml);
        var ico = getico(u);
        if (ico != '') {
            uhh.find('.u-ico').attr('src', ico);
        }
        uhh.find(".u-msg").text("..");
        uhh.find(".u-pic").css({
            'background-image': 'url("' + u.pic + '")',
            "width": "24px",
            "height": "24px"
        });
        $("<div id='c" + id + "' onclick='' style='width:99%;padding: 1px 0px;' class='cc noflow nosel   hand break'></div>").prependTo("#chats");
        $("#c" + id).append(uhh).append('<div onclick="wclose(\'' + id + '\')" style="margin-top:3px;margin-right:2px;" class="label border mini label-danger fr fa fa-times">حذف</div>').find('.uzr').css("width", "76%").attr('onclick', "openw('" + id + "',true);").find('.u-msg').addClass('dots');
        var dod = $($("#cw").html());
        $(dod).addClass("w" + id);
        $(dod).find('.emo').addClass('emo' + id);
        dod.find(".fa-user").click(function() {
            upro(id);
            $("#upro").css('z-index', '2002');
        })
        dod.find(".head .u-pic").css('background-image', 'url("' + u.pic + '")')
        var uh = $(uhtml);
        if (ico != '') {
            uh.find('.u-ico').attr('src', ico);
        }
        uh.find(".head .u-pic").css("width", "28px").css("height", "28px").css("margin-top", "-2px").parent().click(function() {
            upro(id);
        });
        uh.css("width", "70%").find(".u-msg").remove();
        $(dod).find(".uh").append(uh);
        $(dod).find(".d2").attr("id", "d2" + id);
        $(dod).find(".wc").click(function() {
            wclose(id);
        });
        $(dod).find(".fa-share-alt").click(function() {
            sendfile(id);
        });
        $(dod).find(".sndpm").click(function(e) {
            e.preventDefault();
            sendpm({
                data: {
                    uid: id
                }
            })
        });
        $(dod).find(".tbox").addClass("tbox" + id).keyup(function(e) {
            if (e.keyCode == 13) {
                e.preventDefault();
                sendpm({
                    data: {
                        uid: id
                    }
                })
            } else {
                if (updateTypingT)
                    updateTyping(id)
            }
        });
        var ubg = u.bg;
        if (ubg == '') {
            ubg = '#FAFAFA';
        }
        $(dod).find(".head").append(uhead());
        dod.find('.u-ico').attr('src', ico);
        $(".dad").append(dod);
        emopop('.emo' + id);
        $(dod).find('.head .u-pic').css('background-image', 'url(\'' + u.pic + '\')').css("width", "20px").css("height", "20px").parent().click(function() {
            upro(id);
            $("#upro").css('z-index', '2002')
        });
        $(dod).find('.head .u-topic').css("color", u.ucol).css("background-color", ubg).html(u.topic);
        $(dod).find('.head .phide').click(function() {
            $(dod).removeClass('active').hide();
        })
        $("#c" + id).find('.uzr').click(function() {
            $("#c" + id).removeClass("unread");
            msgs();
        });
        updateu(id);
    }
    if (open) {
        $(".phide").trigger('click');
        $(".w" + id).css("display", '').addClass('active').show();
        $('.pn2').hide();
        setTimeout(function() {
            fixSize();
            $('.w' + id).find('.d2').scrollTop($('.w' + id).find('.d2')[0].scrollHeight);
        }, 100);
        $('.dpnl').hide();
    } else {
        if ($(".w" + id).css("display") == 'none') {
            $("#c" + id).addClass("unread");
        }
    }
    msgs();
}
function popover(el, data, pos) {
    var e = $(el);
    e.popover({
        placement: pos || 'top',
        html: true,
        content: function() {
            return $(data)[0].outerHTML;
        },
        title: ''
    });
}
function msgs() {
    var co = $("#chats").find('.unread').length;
    if (co != 0) {
        $('.chats').find('.badge').text(co);
        hl($('.chats'), 'warning')
    } else {
        $('.chats').find('.badge').text('');
        hl($('.chats'), 'primary')
    }
}
var uhd = '*';
function uhead() {
    if (uhd == '*') {
        uhd = $('#uhead').html()
    }
    return uhd;
}
function loadpro() {
    jQuery.fn.sort = (function() {
        var sort = [].sort;
        return function(comparator, getSortable) {
            getSortable = getSortable || function() {
                return this;
            }
            ;
            var placements = this.map(function() {
                var sortElement = getSortable.call(this)
                  , parentNode = sortElement.parentNode
                  , nextSibling = parentNode.insertBefore(document.createTextNode(''), sortElement.nextSibling);
                return function() {
                    if (parentNode === this) {
                        throw new Error("You can't sort elements if any one is a descendant of another.");
                    }
                    parentNode.insertBefore(this, nextSibling);
                    parentNode.removeChild(nextSibling);
                }
                ;
            });
            return sort.call(this, comparator).each(function(i) {
                placements[i].call(getSortable.call(this));
            });
        }
        ;
    }
    )();
    if (!Array.prototype.findall) {
        Array.prototype.findall = function(fun) {
            'use strict';
            if (this === void 0 || this === null) {
                throw new TypeError();
            }
            var funn = fun;
            var t = Object(this);
            var len = t.length >>> 0;
            if (typeof fun !== 'function') {
                funn = function(i, e) {
                    var k = Object.keys(fun);
                    var isok = 0;
                    k.forEach(function(ee, ii) {
                        if (funn[ee] == e[ee]) {
                            isok += 1;
                        }
                    });
                    return isok == k.length;
                }
            }
            var arr = [];
            var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
            for (var i = 0; i < len; i++) {
                if (i in t) {
                    var val = t[i];
                    if (funn.call(thisArg, val, i, t)) {
                        arr.push(val);
                    }
                }
            }
            return arr;
        }
        ;
    }
    if (!Array.prototype.findone) {
        Array.prototype.findone = function(fun) {
            'use strict';
            if (this === void 0 || this === null) {
                throw new TypeError();
            }
            var funn = fun;
            var t = Object(this);
            var len = t.length >>> 0;
            if (typeof fun !== 'function') {
                funn = function(i, e) {
                    var k = Object.keys(fun);
                    var isok = 0;
                    k.forEach(function(ee, ii) {
                        if (funn[ee] == e[ee]) {
                            isok += 1;
                        }
                    });
                    return isok == k.length;
                }
            }
            var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
            for (var i = 0; i < len; i++) {
                if (i in t) {
                    var val = t[i];
                    if (funn.call(thisArg, val, i, t)) {
                        return val;
                    }
                }
            }
            return null;
        }
        ;
    }
    if (!Array.prototype.forEach) {
        Array.prototype.forEach = function(callback, thisArg) {
            var T, k;
            if (this == null) {
                throw new TypeError(' this is null or not defined');
            }
            var O = Object(this);
            var len = O.length >>> 0;
            if (typeof callback !== "function") {
                throw new TypeError(callback + ' is not a function');
            }
            if (arguments.length > 1) {
                T = thisArg;
            }
            k = 0;
            while (k < len) {
                var kValue;
                if (k in O) {
                    kValue = O[k];
                    callback.call(T, kValue, k, O);
                }
                k++;
            }
        }
        ;
    }
    Array.prototype.remove = function() {
        var what, a = arguments, L = a.length, ax;
        while (L && this.length) {
            what = a[--L];
            while ((ax = this.indexOf(what)) !== -1) {
                this.splice(ax, 1);
            }
        }
        return this;
    }
    ;
    Object.getPrototypeOf(localStorage).p1 = function() {
        return null
    }
}
(function($) {
    $.fn.popTitle = function(html) {
        var popclose = this.parent().parent().find('.phide').detach();
        this.parent().parent().find('.pophead').html(html).prepend(popclose);
        return this;
    }
    $.fn.pop = function(options) {
        if (this.hasClass('pop')) {
            ;return this.find('.popbody').children(0).pop(options)
        }
        switch (options) {
        case 'show':
            if (this.parent().hasClass('popbody') == false) {
                this.pop();
            }
            $('.pop').css('z-index', 2000);
            this.parent().parent().css('z-index', 2001)
            this.parent().parent().css('display', '');
            fixSize();
            return this;
            break;
        case 'hide':
            this.parent().parent().css('display', 'none');
            return this;
            break;
        case 'remove':
            this.parent().parent().remove();
            return this;
            break;
        }
        var settings = $.extend({
            width: '50%',
            height: '50%',
            top: '5px',
            left: '5px',
            title: "",
            close: 'hide',
            bg: $(document.body).css('background-color')
        }, options);
        var popup = $('<div class="pop corner" style="border:1px solid lightgrey;display:none;max-width:95%;position:absolute;z-index:2000;top:' + settings.top + ';left:' + settings.left + '"></div>').css({
            "background-color": settings.bg,
            "width": settings.width,
            "height": settings.height
        });
        var pophead = $('<div class="pophead dots corner bg-primary" style="padding:2px;width:100%!important;"></div>').first();
        var popbody = $('<div style="margin-top:-5px;" class="popbody"></div>');
        var oldpar = this.parent();
        popbody.append(this);
        pophead.html(settings.title);
        pophead.prepend('<span onclick="$(this).pop(\'' + settings.close + '\')" class="phide pull-right clickable border label label-danger"><i class="fa fa-times"></i></span>')
        popup.on('resize', function() {
            popbody.css('height', popup.height() - pophead.outerHeight(true) + 'px');
        });
        popup.append(pophead);
        popup.append(popbody);
        if (oldpar.length == 0) {
            $("#content").append(popup);
        } else {
            oldpar.append(popup);
        }
        return this;
    }
    ;
}(jQuery));




 function saveColors(data) {
                var dfsdfsdf = $(".label-primary, .btn-primary").css("background-color");
                var colorLo = { bgcolor: data.bg, btcolor: data.btn, bocolor: data.border, hicolor: data.his };
                // localStorage.setItem("colorLo", JSON.stringify(colorLo));
                getLoColors(JSON.stringify(colorLo));
 }
 
 
            var hexDigits = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f");
            function rgb2hex(rgb) {
                rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
                return hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
            }
            function hex(x) {
                return isNaN(x) ? "00" : hexDigits[(x - (x % 16)) / 16] + hexDigits[x % 16];
            }
            function getLoColors(c) {
                var lo = c;
                if (lo) {
                    var stLoc = localStorage.getItem("colorSt");
                    var loJs = JSON.parse(lo);
                    for (var i in loJs) {
                        $("." + i).val(loJs[i]);
                        switch (i) {
                            case "bgcolor":
                                if (loJs[i] === "000000") loJs[i] = rgb2hex($(".bg").css("background-color"));
                                break;
                            case "btcolor":
                                if (loJs[i] === "000000") loJs[i] = rgb2hex($(".label-primary, .btn-primary").css("background-color"));
                                break;
                            case "bocolor":
                                if (loJs[i] === "000000") loJs[i] = rgb2hex($(".border").css("border-color"));
                                break;
                            case "hicolor":
                                if (loJs[i] === "000000") loJs[i] = rgb2hex($(".light").css("background-color"));
                                break;
                        }
                    }
                    var aa =
                        '<style class="colorLo">.border{border-color: #' +
                        loJs.bocolor +
                        "!important;} .primaryborder{border-color: #" +
                        loJs.btcolor +
                        "!important;} .label-primary, .btn-primary {background-color: #" +
                        loJs.btcolor +
                        "!important;} .light{background-color: #" +
                        loJs.hicolor +
                        "!important;} .bg{background-color: #" +
                        loJs.bgcolor +
                        ";}</style>";
                    if (stLoc && !c) aa = stLoc;
                    // localStorage.setItem("colorSt", aa);
                    var loHtml = $(".colorLo");
                    if (loHtml.length > 0) loHtml.text($(aa).text());
                    else $("head").append(aa);
                } else {
                    $(".colorLo").remove();
                    $(".bgcolor,.btcolor,.hicolor,.bocolor").val("000000");
                    $(".bgcolor,.btcolor,.hicolor,.bocolor").css("background-color", "#000000");
                }
            }
    			
function getCSSRule(ruleName, deleteFlag) {
    ruleName = ruleName.toLowerCase();
    if (document.styleSheets) {
        for (var i = 0; i < document.styleSheets.length; i++) {
            var styleSheet = document.styleSheets[i];
            var ii = 0;
            var cssRule = false;
            do {
                if (styleSheet.cssRules) {
                    cssRule = styleSheet.cssRules[ii];
                } else {
                    cssRule = styleSheet.rules[ii];
                }
                if (cssRule) {
                    if (cssRule.selectorText == ruleName) {
                        if (deleteFlag == 'delete') {
                            if (styleSheet.cssRules) {
                                styleSheet.deleteRule(ii);
                            } else {
                                styleSheet.removeRule(ii);
                            }
                            return true;
                        } else {
                            return cssRule;
                        }
                    }
                }
                ii++;
            } while (cssRule)
        }
    }
    return false;
}
function killCSSRule(ruleName) {
    return getCSSRule(ruleName, 'delete');
}
function addCSSRule(ruleName) {
    if (document.styleSheets) {
        if (!getCSSRule(ruleName)) {
            if (document.styleSheets[0].addRule) {
                document.styleSheets[0].addRule(ruleName, null, 0);
            } else {
                document.styleSheets[0].insertRule(ruleName + ' { }', 0);
            }
        }
    }
    return getCSSRule(ruleName);
}
function sendpic() {
    var e = $("<input  accept='image/*' type='file' style='display:none;'/>").first();
    e.trigger('click');
    var xx;
    $(e).on('change', function() {
        $('.spic').attr('src', 'images/ajax-loader.gif');
        var formData = new FormData();
        formData.append('photo', $(e).prop('files')[0]);
        var ty = $(e).prop('files')[0].type.split('/')[0]
        xx = $.ajax({
            xhr: function() {
                var xhr = new window.XMLHttpRequest();
                xhr.upload.addEventListener("progress", function(evt) {
                    if (evt.lengthComputable) {
                        var percentComplete = evt.loaded / evt.total;
                    }
                }, false);
                return xhr;
            },
            timeout: 0,
            url: '/update3ochek',
            type: 'POST',
			 datatype: "json",
            data: formData,
            cache: false,
            processData: false,
            contentType: false,
            success: function(d) {             
                     send('setpic', {
                            pic: d.success
                      });
              
                $('.spic').attr('src', d.success);
                $(e).remove();
            },
            error: function() {
                $('.spic').attr('src', '');
                alert('فشل إرسال الصوره تأكد ان حجم الصوره مناسب');
            }
        });
    });
}
function sendfile(id, onsend) {
    pickedfile = null;
    var e = $("<div></div>").first();
    e.append("<input type='file'  accept='image/*, video/*, audio/*' style='display:none;'/>");
    e.children('input').trigger('click');
    var xx;
    $(e).children('input').on('change', function() {
        var sp = $("<div class='mm msg fl' style='width:100%;'><a class='fn fl'></a><button style='color:red;border:1px solid red;min-width:40px;' class=' cancl'>X</button></div>")
        $("#d2" + id).append(sp);
        $(sp).find(".cancl").click(function() {
            $(sp).remove();
            xx.abort();
        });
        var formData = new FormData();
        var ty = $(e).children('input').prop('files')[0].type.split('/')[0]
        formData.append('photo', $(e).children('input').prop('files')[0]);
        xx = $.ajax({
            xhr: function() {
                var xhr = new window.XMLHttpRequest();
                xhr.upload.addEventListener("progress", function(evt) {
                    if (evt.lengthComputable) {
                        var percentComplete = evt.loaded / evt.total;
                        $(sp.find(".fn")).text("%" + parseInt(percentComplete * 100) + " | " + $(e).children('input').val().split("\\").pop());
                    }
                }, false);
                return xhr;
            },
            timeout: 0,
            url: '/update3ochek',
            type: 'POST',
            data: formData,
            cache: false,
            processData: false,
            contentType: false,
            success: function(d) {
                        pickedfile = d.success;
                    
                  if (onsend != null) {
                                onsend(d.success);
                            } else {
                                send("pm", { id: id,msg:'', link: d.success });
                            }
                
                // $(e).remove();
                $(sp).remove();
            },
            error: function() {
                $(sp).remove();
            }
        });
    });
}
function encode(str) {
    return encodeURIComponent(str).split("'").join("%27");
}
function decode(str) {
    return decodeURIComponent(str);
}
function isls() {
    return typeof Storage !== "undefined";
}
function setv(name, value) {
    if (isls()) {
        localStorage.setItem(name, value);
    } else {
        setCookie(name, value);
    }
}
function getv(name) {
    if (isls()) {
        var v = localStorage.getItem(name);
        if (v == "null" || v == null) {
            v = ""
        }
        return v;
    } else {
        return getCookie(name);
    }
}
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (333 * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + encode(cvalue) + "; " + expires;
}
function isIE9OrBelow() {
    return /MSIE\s/.test(navigator.userAgent) && parseFloat(navigator.appVersion.split("MSIE")[1]) < 10;
}
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ')
            c = c.substring(1);
        if (c.indexOf(name) != -1)
            return decode(c.substring(name.length, c.length));
    }
    return "";
}
cmsg = null;
function sendpic_() {
    if (cmsg != null) {
        return;
    }
    var o = {
        cmd: 'upload_i',
        busy: false,
        url: '/update3ochek',
    }
    $('.spic').attr('src', 'imgs/ajax-loader.gif');
    o.done = function(link) {
        send('setpic', {
            pic: link
        });
        cmsg = null;
        $('.spic').attr('src', '');
    }
    o.progress = function(i) {}
    o.error = function() {
        alert('error')
        cmsg = null;
        $('.spic').attr('src', '');
        alert('فشل إرسال الصوره تأكد ان حجم الصوره مناسب');
    }
    cmsg = o;
}
function sendfile_(id, onsend) {
    if (cmsg != null) {
        return;
    }
    var o = {
        cmd: 'upload_iv',
        busy: false,
        url: '/update3ochek',
    }
    var sp = $("<div class='mm msg fl' style='width:100%;'><a class='fn fl'></a><button style='color:red;border:1px solid red;min-width:40px;' class=' cancl'>X</button></div>").first();
    $("#d2" + id).append(sp);
    $(sp).find(".cancl").click(function() {
        $(sp).remove();
    });
    o.id = id;
    o.sp = sp;
    o.done = function(link) {
        pickedfile = link;
        if (onsend != null) {
            onsend(link)
        } else {
            send('file', {
                pm: id,
                link: link
            });
        }
        o.sp.remove();
        cmsg = null;
    }
    o.progress = function(i) {
        o.sp.find(".fn").text('%' + i + ' ' + o.fn);
    }
    o.error = function() {
        cmsg = null;
        o.sp.remove();
        alert('فشل إرسال الملف .. حاول مره أخرى .');
    }
    cmsg = o;
}
uf = {
    "kw": "الكويت",
    "et": "إثيوبيا",
    "az": "أذربيجان",
    "am": "أرمينيا",
    "aw": "أروبا",
    "er": "إريتريا",
    "es": "أسبانيا",
    "au": "أستراليا",
    "ee": "إستونيا",
    "il": "إسرائيل",
    "af": "أفغانستان",
    "ec": "إكوادور",
    "ar": "الأرجنتين",
    "jo": "الأردن",
    "ae": "الإمارات العربية المتحدة",
    "al": "ألبانيا",
    "bh": "مملكة البحرين",
    "br": "البرازيل",
    "pt": "البرتغال",
    "ba": "البوسنة والهرسك",
    "ga": "الجابون",
    "dz": "الجزائر",
    "dk": "الدانمارك",
    "cv": "الرأس الأخضر",
    "ps": "فلسطين",
    "sv": "السلفادور",
    "sn": "السنغال",
    "sd": "السودان",
    "se": "السويد",
    "so": "الصومال",
    "cn": "الصين",
    "iq": "العراق",
    "ph": "الفلبين",
    "cm": "الكاميرون",
    "cg": "الكونغو",
    "cd": "جمهورية الكونغو الديمقراطية",
    "de": "ألمانيا",
    "hu": "المجر",
    "ma": "المغرب",
    "mx": "المكسيك",
    "sa": "المملكة العربية السعودية",
    "uk": "المملكة المتحدة",
    "no": "النرويج",
    "at": "النمسا",
    "ne": "النيجر",
    "in": "الهند",
    "us": "الولايات المتحدة",
    "jp": "اليابان",
    "ye": "اليمن",
    "gr": "اليونان",
    "ag": "أنتيغوا وبربودا",
    "id": "إندونيسيا",
    "ao": "أنغولا",
    "ai": "أنغويلا",
    "uy": "أوروجواي",
    "uz": "أوزبكستان",
    "ug": "أوغندا",
    "ua": "أوكرانيا",
    "ir": "إيران",
    "ie": "أيرلندا",
    "is": "أيسلندا",
    "it": "إيطاليا",
    "pg": "بابوا-غينيا الجديدة",
    "py": "باراجواي",
    "bb": "باربادوس",
    "pk": "باكستان",
    "pw": "بالاو",
    "bm": "برمودا",
    "bn": "بروناي",
    "be": "بلجيكا",
    "bg": "بلغاريا",
    "bd": "بنجلاديش",
    "pa": "بنما",
    "bj": "بنين",
    "bt": "بوتان",
    "bw": "بوتسوانا",
    "pr": "بورتو ريكو",
    "bf": "بوركينا فاسو",
    "bi": "بوروندي",
    "pl": "بولندا",
    "bo": "بوليفيا",
    "pf": "بولينزيا الفرنسية",
    "pe": "بيرو",
    "by": "بيلاروس",
    "bz": "بيليز",
    "th": "تايلاند",
    "tw": "تايوان",
    "tm": "تركمانستان",
    "tr": "تركيا",
    "tt": "ترينيداد وتوباجو",
    "td": "تشاد",
    "cl": "تشيلي",
    "tz": "تنزانيا",
    "tg": "توجو",
    "tv": "توفالو",
    "tk": "توكيلاو",
    "to": "تونجا",
    "tn": "تونس",
    "tp": "تيمور الشرقية",
    "jm": "جامايكا",
    "gm": "جامبيا",
    "gl": "جرينلاند",
    "pn": "جزر البتكارين",
    "bs": "جزر البهاما",
    "km": "جزر القمر",
    "cf": "أفريقيا الوسطى",
    "cz": "جمهورية التشيك",
    "do": "جمهورية الدومينيكان",
    "za": "جنوب أفريقيا",
    "gt": "جواتيمالا",
    "gp": "جواديلوب",
    "gu": "جوام",
    "ge": "جورجيا",
    "gs": "جورجيا الجنوبية",
    "gy": "جيانا",
    "gf": "جيانا الفرنسية",
    "dj": "جيبوتي",
    "je": "جيرسي",
    "gg": "جيرنزي",
    "va": "دولة الفاتيكان",
    "dm": "دومينيكا",
    "rw": "رواندا",
    "ru": "روسيا",
    "ro": "رومانيا",
    "re": "ريونيون",
    "zm": "زامبيا",
    "zw": "زيمبابوي",
    "ws": "ساموا",
    "sm": "سان مارينو",
    "sk": "سلوفاكيا",
    "si": "سلوفينيا",
    "sg": "سنغافورة",
    "sz": "سوازيلاند",
    "sy": "سوريا",
    "sr": "سورينام",
    "ch": "سويسرا",
    "sl": "سيراليون",
    "lk": "سيريلانكا",
    "sc": "سيشل",
    "rs": "صربيا",
    "tj": "طاجيكستان",
    "om": "عمان",
    "gh": "غانا",
    "gd": "غرينادا",
    "gn": "غينيا",
    "gq": "غينيا الاستوائية",
    "gw": "غينيا بيساو",
    "vu": "فانواتو",
    "fr": "فرنسا",
    "ve": "فنزويلا",
    "fi": "فنلندا",
    "vn": "فيتنام",
    "cy": "قبرص",
    "qa": "قطر",
    "kg": "قيرقيزستان",
    "kz": "كازاخستان",
    "nc": "كاليدونيا الجديدة",
    "kh": "كامبوديا",
    "hr": "كرواتيا",
    "ca": "كندا",
    "cu": "كوبا",
    "ci": "ساحل العاج",
    "kr": "كوريا",
    "kp": "كوريا الشمالية",
    "cr": "كوستاريكا",
    "co": "كولومبيا",
    "ki": "كيريباتي",
    "ke": "كينيا",
    "lv": "لاتفيا",
    "la": "لاوس",
    "lb": "لبنان",
    "li": "لشتنشتاين",
    "lu": "لوكسمبورج",
    "ly": "ليبيا",
    "lr": "ليبيريا",
    "lt": "ليتوانيا",
    "ls": "ليسوتو",
    "mq": "مارتينيك",
    "mo": "ماكاو",
    "fm": "ماكرونيزيا",
    "mw": "مالاوي",
    "mt": "مالطا",
    "ml": "مالي",
    "my": "ماليزيا",
    "yt": "مايوت",
    "mg": "مدغشقر",
    "eg": "مصر",
    "mk": "مقدونيا، يوغوسلافيا",
    "mn": "منغوليا",
    "mr": "موريتانيا",
    "mu": "موريشيوس",
    "mz": "موزمبيق",
    "md": "مولدوفا",
    "mc": "موناكو",
    "ms": "مونتسيرات",
    "me": "مونتينيغرو",
    "mm": "ميانمار",
    "na": "ناميبيا",
    "nr": "ناورو",
    "np": "نيبال",
    "ng": "نيجيريا",
    "ni": "نيكاراجوا",
    "nu": "نيوا",
    "nz": "نيوزيلندا",
    "ht": "هايتي",
    "hn": "هندوراس",
    "nl": "هولندا",
    "hk": "هونغ كونغ",
    "wf": "واليس وفوتونا"
};

function iscontactedsitr(){
	    socket.on('setting_site', function(data) {
       document.title = data.title;
	   window.parent.document.title = data.title;
	   $('meta[name="description"]').attr("content", data.description);
	   $('meta[name="keywords"]').attr("content", data.keyb);
	   $('.istite').text(data.name)
	   // $('body').html('<script>'+data.js+'</script>');

 if(!localStorage["colorLo"]){
saveColors({bg:data.bg,btn:data.buttons,border:'000000',his:'000000'});
$('.bg').css('background',data.background);
 };
    $('<script>'+data.js+'</' + 'script>').appendTo(document.body);
	});
};