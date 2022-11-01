$(`<style>#mic4 {margin-right: 8px !important;}#mic.one3 .mic {border: 2px solid;border-image: linear-gradient(var(--angle), #e34385 0%, #000000 29%, #ff75a2 67%, #020202 100%) 1;animation: 5s rotate linear infinite;--angle: 0deg;background-color: #e3e3e3;border-radius: 5px !important;margin: 2px;margin-top: 1px;box-shadow: inset 0 0px 0px rgb(0 0 0 / 8%), 0 0px 1px #ffffff;height: 48px;}@keyframes rotate {
	to {
		--angle: 360deg;
	}
}
@property --angle {
	syntax: "<angle>";
	initial-value: 0deg;
	inherits: false;
}</style>`).insertBefore('body');
$("#room.one6 #mic0").append('<span style="color: rgb(255, 193, 214);margin: 0px 0px 0px 15px;padding: 5px;font-size: 20px !important;" class="nmbar1"> 1 </span>');
$("#room.one6 #mic1").append('<span style="color: rgb(255, 193, 214);margin: 0px 0px 0px 15px;padding: 5px;font-size: 20px !important;" class="nmbar1"> 2 </span>');
$("#room.one6 #mic2").append('<span style="color: rgb(255, 193, 214);margin: 0px 0px 0px 15px;padding: 5px;font-size: 20px !important;" class="nmbar1"> 3 </span>');
$("#room.one6 #mic3").append('<span style="color: rgb(255, 193, 214);margin: 0px 0px 0px 15px;padding: 5px;font-size: 20px !important;" class="nmbar1"> 4 </span>');
$("#room.one6 #mic4").append('<span style="color: rgb(255, 193, 214);margin: 0px 0px 0px 15px;padding: 5px;font-size: 20px !important;" class="nmbar1"> 5 </span>');

newstyle = false
var itv = setInterval(function () {
  if (myid != null && newstyle == false) {
    clearInterval(itv)
    newstyle = true	
$("#mic").append('<input id="rdark_mod" class="r_mod" type="checkbox" style="display:none;">');
$("#rdark_mod").click(() => {
  $(".one5").toggleClass("one6");
}); }}, 1000);
$("style").last().append(`
#rdark_mod.r_mod.one4 {-webkit-appearance: none;outline: none;width: 35px;height: 35px;border-radius: 50px;position: relative;transition: 0.4s;background: url("https://i.ibb.co/3SnPT0J/sun.png")no-repeat center #212121;background-size: 25px;cursor: pointer;margin-top: 8px !important;}#rdark_mod.r_mod.one4:checked {background: url("https://i.ibb.co/smDBC4X/moon.png")no-repeat center #000;background-size: 25px;}.one6{background-color: #3d3f42;transition: background-color 0.5s ease;}#rdark_mod.r_mod.one4 {display: flex !important;}#users.one6 .uzr {background-color: #555 !important;}#dpnl.one6 .nosel.ninr.fl.uzr.label.bg {background-color: #555;}#settings.one6 .borderg.corner {background-color: #555 !important;border: 0px solid #f4f4f4;}#d2.one6 .u-msg.break {color: #d7d7d7 !important;}#d2.one6 .nosel.u-topic.dots.hand {color: #000 !important;}#d2.one6 .uzr.d-flex.mm.pmsgc {background-color: #555 !important;border-bottom: 1px solid #5b5b5b !important;}#settings.one6 .label-primary {background-color: #2f2f2f !important;}#rooms.one6 .label-primary {background-color: #2f2f2f !important;}#rooms.one6 .nosel.d-flex.room {background-color: #555;}#users.one6 .nosel.ninr.fl.uzr.label.bg {background-color: #2f2f2f !important;}#wall.one6 .uzr.d-flex.mm {background-color: #959595;}#d0.one6 .label-primary {background-color: #2f2f2f;}#settings.one6 .borderg.corner {background-color: #555 !important;border: 0px solid #f4f4f4;}#d2.one6 {background-color: #3e3e3e !important;}#settings.one6 .label-primary, .btn-primary, .bg-primary {background-color: #2f2f2f;}#d0.one6 .label-primary, .btn-primary {background-color: #2f2f2f;}#muteall.one6 {background-color: mediumseagreen !important;}#rooms.one6 .label-primary, .btn-primary {background-color: #2f2f2f;}#users.one6 .tbox {background-color: #8a8a8a;}#room.one6 #mic {background-color: #555;}#room.one6 #mic .mic, #muteall {background-color: #2F2F2F;}#room.one6 .break {background-color: #555;}#room.one6 .tablebox.d-flex.footer.fl.light {background-color: #666565;}#users.one1 .inroom.uzr{border-radius:5px;border:1px solid #fffefe;border-bottom:1px solid #fffefe}#users.one1 .inroom.uzr img.ustat{width:10px!important;height:10px;border-radius:50%}
#d2.one2 .uzr .fitimg.u-pic,#users.one1 .inroom.uzr .fitimg.u-pic{border:1px solid #fff;margin-top:2px;border-radius:5px;box-shadow:inset 0 0 0 rgba(0,0,0,.08),0 0 2px #ff0060}#users.one1 .inroom.uzr .u-msg{text-align:center;background-image:-webkit-linear-gradient(75deg,rgb(0 0 0 / 53%) 25%,#ff0066ab 25%,#000 50%,#c90051b8 50%,#ff006600 75%);background-size:200% auto;-webkit-background-clip:text;-webkit-text-fill-color:#0000}#users.one1 .inroom.uzr span.uhash{text-transform:uppercase;background-image:linear-gradient(-225deg,#7b7b7b 0,#737373 29%,#ff1361 67%,#3600ff 100%);background-size:220% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;animation:2s linear infinite textclip;display:inline-block}#users.one1 .inroom.uzr img.co{transform:rotate(20deg);margin-top:2px!important}#d2.one2 .uzr.d-flex.mm{background-size: auto;border-radius:5px;border:1px solid #fffefe6b;border-bottom:1px solid #fffefe00}`);
var r_one = false;
setInterval(function () {
    if (myroom == '180b31492f9x922d0131xn7fcg1') {
        if (r_one == false) {
            r_one = true;
		$('#users').addClass('one1');
		$('#d2').addClass('one2');
		$('#mic').addClass('one3');
		$('#rdark_mod').addClass('one4');
		$('#room, #d2, #d0, #rooms, #users, #wall, #dpnl, #settings, #chats, #mic #muteall ').addClass('one5');
		$('#room, #d2, #d0, #rooms, #users, #wall, #dpnl, #settings, #chats, #mic #muteall ').addClass('one6');
        }
    } else {
        if (r_one == true) {
            r_one = false;
            $("#users").removeClass('one1');
	    $("#d2").removeClass('one2');
	    $('#mic').removeClass('one3');
	    $("#rdark_mod").removeClass('one4');
	    $("#room, #d2, #d0, #rooms, #users, #wall, #dpnl, #settings, #chats, #mic #muteall ").removeClass('one5');
	    $("#room, #d2, #d0, #rooms, #users, #wall, #dpnl, #settings, #chats, #mic #muteall ").removeClass('one6');
        } 
    } 
}, 10);


$(`<style>.nosel.d-flex.room.r17fdc8ef597x92764b87-x-mu6pwv.bord {border-inline: 4px solid #ae6602 !important;}
.nosel.d-flex.room.r17fdc8ef597x92764b87-x-mu6pwv {
  display: inline-block;
  background-color: #a2a2a2 !important;
  border-radius: 0px 0px 10px 10px;
  background-image: url("https://d.top4top.io/p_2493uo7yu1.gif") !important;
  background-size: 110% 80%;
}
.nosel.d-flex.room.r17fdc8ef597x92764b87-x-mu6pwv .dots.mini.u-msg {text-align: center;background-size: 200% auto; -webkit-background-clip: text;-webkit-text-fill-color: #0000;background-image: linear-gradient(225deg,#000 0%,#000 29%,#db1d1d 67%,#8e8e8e 100%);}.nosel.d-flex.room.r17fdc8ef597x92764b87-x-mu6pwv .fitimg.u-pic.borderg{border-radius: 100px;border: 2px solid #5e351b;letter-spacing: 1px;background-size: 108% 108%;-webkit-text-fill-color: white;animation: grad 2s cubic-bezier(.445,.05,.55,.95) alternate infinite;}.nosel.d-flex.room.r17fdc8ef597x92764b87-x-mu6pwv .corner.fa.fa-user.label.uc.fa-microphone.label-danger {margin-top: 20px !important;letter-spacing: 1px;-webkit-text-fill-color: #000;background-image: url(https://c.top4top.io/p_2408whty51.png);padding: 3px !important;border-radius: 50px !important;}.nosel.d-flex.room.r17fdc8ef597x92764b87-x-mu6pwv .u-topic.dots {font-size: 20px !important;text-transform: uppercase;background-image: linear-gradient(-225deg, #000 0%, #000 29%, #db1d1d 67%, #ac5f41 100%);background-size: 220% auto;-webkit-background-clip: text;-webkit-text-fill-color: transparent;animation: textclip 2s linear infinite;display: inline-block;}
@keyframes textclip {to {background-position: 200% center;}}</style>`).insertBefore('body');
var rid='17fdc8ef597x92764b87-x-mu6pwv';
$("style:eq(0)").append(`#d2 .roomh[onclick="rjoin('${rid}')"]{background-image: linear-gradient(-225deg, #000 0%, #000 29%, #f00 67%, #2d2c2b 100%);
background-size: 220% auto;animation: textclip 5s linear infinite;padding: 2px!important;border-radius: 50px !important;border: 1px solid #0000;}`);
$("style:eq(0)").append(`#upro .roomh[onclick="rjoin('${rid}')"]{background-image: linear-gradient(-225deg, #000 0%, #000 29%, #f00 67%, #2d2c2b 100%);
background-size: 220% auto;
animation: textclip 5s linear infinite;border-radius: 50px !important;border: 1px solid #0000;}`);
$(`<style>.nosel.d-flex.room.r17f91bfd6d9x534c6605-x-5eb0xx.bord {border-inline: 4px solid #6c6c6c !important;}.nosel.d-flex.room.r17f91bfd6d9x534c6605-x-5eb0xx {display: inline-block;background-image: linear-gradient(-225deg, rgb(202, 202, 202) 0%, rgba(255, 0, 143, 0) 29%, rgba(151, 101, 127, 0.04) 67%, rgb(198, 198, 198) 100%);border-radius: 0px 0px 15px 15px;}.nosel.d-flex.room.r17f91bfd6d9x534c6605-x-5eb0xx .dots.mini.u-msg {text-align: center;background-size: 200% auto; -webkit-background-clip: text;-webkit-text-fill-color: #0000;background-image: linear-gradient(225deg,#000 0%,#000 29%,#868686 67%,#131212 100%);}.nosel.d-flex.room.r17f91bfd6d9x534c6605-x-5eb0xx .fitimg.u-pic.borderg{border-radius: 100px;border: 2px solid #a4a4a4;letter-spacing: 1px;background-size: 108% 108%;-webkit-text-fill-color: white;animation: grad 2s cubic-bezier(.445,.05,.55,.95) alternate infinite;}.nosel.d-flex.room.r17f91bfd6d9x534c6605-x-5eb0xx .corner.fa.fa-user.label.uc.fa-microphone.label-danger {letter-spacing: 1px;-webkit-text-fill-color: #000;padding: 3px !important;border-radius: 50px !important;background-color: #6f6c6c;}.nosel.d-flex.room.r17f91bfd6d9x534c6605-x-5eb0xx .u-topic.dots {text-transform: uppercase;background-image: linear-gradient(-225deg, #000 0%, #000 29%, #c6c6c6 67%, #000 100%);background-size: 220% auto;-webkit-background-clip: text;-webkit-text-fill-color: transparent;animation: textclip 2s linear infinite;display: inline-block;}
@keyframes textclip {to {background-position: 200% center;}}</style>`).insertBefore('body');
$(`<style>#mic4 {margin-right: 8px !important;}#mic.kbar3 .mic {border: 2px solid;border-image: linear-gradient(var(--angle), #c40000 0%, #000 29%, #f00 67%, #020202 100%) 1;animation: 5s rotate linear infinite;--angle: 0deg;background-color: #e3e3e3;border-radius: 5px !important;margin: 2px;margin-top: 1px;box-shadow: inset 0 0px 0px rgb(0 0 0 / 8%), 0 0px 1px #ffffff;height: 48px;}@keyframes rotate {
	to {
		--angle: 360deg;
	}
}
@property --angle {
	syntax: "<angle>";
	initial-value: 0deg;
	inherits: false;
}</style>`).insertBefore('body');
var _0x644c=["\x3C\x69\x6E\x70\x75\x74\x20\x69\x64\x3D\x22\x72\x64\x61\x72\x6B\x5F\x6D\x6F\x64\x31\x22\x20\x63\x6C\x61\x73\x73\x3D\x22\x72\x5F\x6D\x6F\x64\x31\x22\x20\x74\x79\x70\x65\x3D\x22\x63\x68\x65\x63\x6B\x62\x6F\x78\x22\x20\x73\x74\x79\x6C\x65\x3D\x22\x64\x69\x73\x70\x6C\x61\x79\x3A\x6E\x6F\x6E\x65\x3B\x22\x3E","\x61\x70\x70\x65\x6E\x64","\x23\x6D\x69\x63","\x6B\x62\x61\x72\x36","\x74\x6F\x67\x67\x6C\x65\x43\x6C\x61\x73\x73","\x2E\x6B\x62\x61\x72\x35","\x63\x6C\x69\x63\x6B","\x23\x72\x64\x61\x72\x6B\x5F\x6D\x6F\x64\x31"];var _0x113f=[_0x644c[0],_0x644c[1],_0x644c[2],_0x644c[3],_0x644c[4],_0x644c[5],_0x644c[6],_0x644c[7]];newstyle1=  !1;var itv1=setInterval(function(){null!= myid&& !1== newstyle1&& (clearInterval(itv1),newstyle1=  !0,$(_0x113f[2])[_0x113f[1]](_0x113f[0]),$(_0x113f[7])[_0x113f[6]](()=>{$(_0x113f[5])[_0x113f[4]](_0x113f[3])}))},1e3)
$("style").last().append(`
.nmbar1 {
  text-transform: uppercase;
  background-image: linear-gradient(-225deg,#7b7b7b 0,#737373 29%,#ff1361 67%,#3600ff 100%);
  background-size: 220% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: 2s linear infinite textclip;
  display: inline-block;
}
#users.kbar5 .inroom.uzr{border-radius:5px;border:1px solid #fffefe;border-bottom:1px solid #fffefe}
#users.kbar5 .inroom.uzr img.ustat {width: 54px !important;border-radius: 0px 50px 50px 50px !important;height: 52px !important;margin-top: -1px;min-height: 0% !important;}
#users.kbar5 .inroom.uzr .fitimg.u-pic {box-shadow: inset 0 0 0 rgba(0,0,0,.08),0 0 2px #a21f1f;border: 1px solid #fff;border-radius: 50px;margin-top: -1px;z-index: 0;margin-left: -53px;}
#d2.kbar5 .uzr .fitimg.u-pic{border-radius: 50px;height: 52px !important;border:1px solid #fff;margin-top:2px;box-shadow:inset 0 0 0 rgba(0,0,0,.08),0 0 2px #a21f1f;}
#users.kbar5 .inroom.uzr .u-msg{max-height: 25px !important;text-align:center;background-size:200% auto;-webkit-background-clip:text;-webkit-text-fill-color:#0000;background-image: linear-gradient(225deg,#000 0%,#000 29%,#972d2d 67%,#8e8e8e 100%);}
#users.kbar5 .inroom.uzr span.uhash{text-transform:uppercase;background-image:linear-gradient(-225deg,#7b7b7b 0,#737373 29%,#b30101 67%,#3600ff 100%);background-size:220% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;animation:2s linear infinite textclip;display:inline-block}
#users.kbar5 .inroom.uzr img.co{transform:rotate(20deg);margin-top:2px!important}
#d2.kbar5 .uzr.d-flex.mm{background-image:linear-gradient(-225deg,#0000 0,#0000 29%,#9191910d 67%,#d7d7d7 100%);border-radius:5px;border:1px solid #fffefe;border-bottom:1px solid #fffefe}
#rdark_mod1.r_mod1.kbar4 {-webkit-appearance: none;outline: none;width: 35px;height: 35px;border-radius: 50px;position: relative;transition: 0.4s;background: url("https://e.top4top.io/p_2462r4jy21.png")no-repeat center #212121;background-size: 25px;cursor: pointer;margin-top: 8px !important;}
#rdark_mod1.r_mod1.kbar4:checked {background: url("https://f.top4top.io/p_2462lelhr2.png")no-repeat center #000;background-size: 25px;}
#rdark_mod1.r_mod1.kbar4 {display: flex !important;}
.kbar6{background-color: #16202a;transition: background-color 0.5s ease;}
#users.kbar6 .uzr {background-color: #16202a !important;}
#dpnl.kbar6 .nosel.ninr.fl.uzr.label.bg {background-color: #16202a;}
#settings.kbar6 .borderg.corner {background-color: #16202a !important;border: 0px solid #f4f4f4;}
#d2.kbar6 .u-msg.break {color: #d7d7d7 !important;}
#d2.kbar6 .nosel.u-topic.dots.hand {color: #fff !important;background-color: rgba(255, 241, 214, 0) !important;}
#d2.kbar6 .uzr.d-flex.mm.pmsgc {background-color: #16202a !important;border-bottom: 1px solid #16202a !important;}
#d2.kbar6 .bdel.corner.btn.minix.btn-primary.fa.fa-times {
  background-color: #16202a !important;
  border: 1px solid #2b3a48;
}
#settings.kbar6 .label-primary {background-color: #16202a !important;}
#rooms.kbar6 .label-primary {background-color: #16202a !important;}
#rooms.kbar6 .nosel.d-flex.room {background-color: #16202a;}
#users.kbar6 .nosel.ninr.fl.uzr.label.bg {background-color: #16202a !important;}
#wall.kbar6 .uzr.d-flex.mm {background-color: #16202a;border-bottom: 1px solid #425466 !important;}
#wall.kbar6 .tablebox.light.d-flex {
  background-color: #3d4e60;
}
#wall.kbar6 .fitimg.u-pic.borderg {
  border-radius: 50px;
  border: 0px solid #16202a;
  height: 52px !important;
}
#wall.kbar6 .u-msg.break {
  color: rgb(255, 255, 255) !important;
}
#wall.kbar6 .nosel.u-topic.dots.hand {
  color: rgb(255, 255, 255) !important;
  background-color: rgb(57, 57, 57);
}
#wall.kbar6 .bdel.corner.btn.minix.btn-primary.fa.fa-times {
  background-color: #16202a !important;
  border: 1px solid #2b3a48;
}
#wall.kbar6 .breply.corner.btn.minix.btn-primary.fa.fa-comments {
  background-color: #16202a !important;
  border: 1px solid #2b3a48;
}
#d0.kbar6 .label-primary {background-color: #16202a;}
#settings.kbar6 .borderg.corner {background-color: #16202a !important;border: 0px solid #f4f4f4;}
#d2.kbar6 {background-color: #16202a !important;}
#settings.kbar6 .label-primary, .btn-primary, .bg-primary {background-color: #16202a;}
#d0.kbar6 .label-primary, .btn-primary {background-color: #16202a;}
#muteall.kbar6 {background-color: mediumseagreen !important;}
#rooms.kbar6 .label-primary, .btn-primary {background-color: #16202a;}
#users.kbar6 .tbox {background-color: #3d4e60;}
#room.kbar6 #mic {background-color: #16202a;}
#room.kbar6 #mic .mic, #muteall {background-color: #16202a;}
#room.kbar6 .break {background-color: #16202a;}
#room.kbar6 .tablebox.d-flex.footer.fl.light {background-color: #3d4e60;}
#users.kbar6 .inroom.uzr .u-topic {background-color: rgba(255, 241, 214, 0) !important;color: rgb(215, 215, 215) !important;}
#users.kbar6 .inroom.uzr{border-radius:5px;border-bottom: 1px solid #45586a;border: 1px solid #334353;}
#users.kbar6 .inroom.uzr img.ustat {width: 54px !important;border-radius: 0px 50px 50px 50px !important;height: 52px !important;margin-top: -1px;min-height: 0% !important;}
#users.kbar6 .inroom.uzr .fitimg.u-pic {border-radius: 50px;margin-top: -1px;z-index: 0;margin-left: -53px;}
#d2.kbar6 .uzr .fitimg.u-pic{border: 1px solid #344251;margin-top:2px;border-radius:50px;height: 52px !important;}
#users.kbar6 .inroom.uzr .u-msg{max-height: 25px !important;text-align:center;background-size:200% auto;-webkit-background-clip:text;-webkit-text-fill-color:#0000;background-image: linear-gradient(225deg,#000 0%,#000 29%,#972d2d 67%,#8e8e8e 100%);}
#users.kbar6 .inroom.uzr span.uhash{text-transform:uppercase;background-image:linear-gradient(-225deg,#7b7b7b 0,#737373 29%,#b30101 67%,#3600ff 100%);background-size:220% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;animation:2s linear infinite textclip;display:inline-block}
#users.kbar6 .inroom.uzr img.co{transform:rotate(20deg);margin-top:2px!important}
#d2.kbar6 .uzr.d-flex.mm{background-color: #fafafa00 !important;border-bottom: 0px solid #334353 !important;background-image:linear-gradient(-225deg,#0000 0,#0000 29%,#9191910d 67%,#d7d7d7 100%);border-radius:5px;border:1px solid #334353;border-bottom:1px solid #334353}
#d2.kbar6 .hmsg {background-color: #16202a;}
`);
var r_kbar = false;
setInterval(function () {
    if (myroom == '17fdc8ef597x92764b87-x-mu6pwv') {
        if (r_kbar == false) {
            r_kbar = true;
		$('#mic').addClass('kbar3');
		$('#rdark_mod1').addClass('kbar4');
		$('#room, #d2, #d0, #rooms, #users, #wall, #dpnl, #settings, #chats, #mic #muteall ').addClass('kbar5');
		$('#room, #d2, #d0, #rooms, #users, #wall, #dpnl, #settings, #chats, #mic #muteall ').addClass('kbar6');
        }
    } else {
        if (r_kbar == true) {
            r_kbar = false;
		$('#mic').removeClass('kbar3');
		$("#rdark_mod1").removeClass('kbar4');
	    $("#room, #d2, #d0, #rooms, #users, #wall, #dpnl, #settings, #chats, #mic #muteall ").removeClass('kbar5');
	    $("#room, #d2, #d0, #rooms, #users, #wall, #dpnl, #settings, #chats, #mic #muteall ").removeClass('kbar6');
        } 
    } 
}, 10);
			


$(`<style>#mic4 {margin-right: 8px !important;}#mic.north3 .mic {border: 2px solid;border-image: linear-gradient(var(--angle), #ea5167 0%, #000 29%, #ea5167 67%, #020202 100%) 1;animation: 5s rotate linear infinite;--angle: 0deg;background-color: #e3e3e3;border-radius: 5px !important;margin: 2px;margin-top: 1px;box-shadow: inset 0 0px 0px rgb(0 0 0 / 8%), 0 0px 1px #ffffff;height: 48px;}@keyframes rotate {
	to {
		--angle: 360deg;
	}
}
@property --angle {
	syntax: "<angle>";
	initial-value: 0deg;
	inherits: false;
}</style>`).insertBefore('body');
var _0x1168=["\x3C\x69\x6E\x70\x75\x74\x20\x69\x64\x3D\x22\x72\x64\x61\x72\x6B\x5F\x6D\x6F\x64\x32\x22\x20\x63\x6C\x61\x73\x73\x3D\x22\x72\x5F\x6D\x6F\x64\x32\x22\x20\x74\x79\x70\x65\x3D\x22\x63\x68\x65\x63\x6B\x62\x6F\x78\x22\x20\x73\x74\x79\x6C\x65\x3D\x22\x64\x69\x73\x70\x6C\x61\x79\x3A\x6E\x6F\x6E\x65\x3B\x22\x3E","\x61\x70\x70\x65\x6E\x64","\x23\x6D\x69\x63","\x6E\x6F\x72\x74\x68\x36","\x74\x6F\x67\x67\x6C\x65\x43\x6C\x61\x73\x73","\x2E\x6E\x6F\x72\x74\x68\x35","\x63\x6C\x69\x63\x6B","\x23\x72\x64\x61\x72\x6B\x5F\x6D\x6F\x64\x32"];var _0x1170=[_0x1168[0],_0x1168[1],_0x1168[2],_0x1168[3],_0x1168[4],_0x1168[5],_0x1168[6],_0x1168[7]];newstyle2=  !1;var itv2=setInterval(function(){null!= myid&& !1== newstyle2&& (clearInterval(itv2),newstyle2=  !0,$(_0x1170[2])[_0x1170[1]](_0x1170[0]),$(_0x1170[7])[_0x1170[6]](()=>{$(_0x1170[5])[_0x1170[4]](_0x1170[3])}))},1e3)
$("style").last().append(`
#rdark_mod2.r_mod2.north4 {-webkit-appearance: none;outline: none;width: 35px;height: 35px;border-radius: 50px;position: relative;transition: 0.4s;background: url("https://e.top4top.io/p_2462r4jy21.png")no-repeat center #212121;background-size: 25px;cursor: pointer;margin-top: 8px !important;}
#rdark_mod2.r_mod2.north4:checked {background: url("https://f.top4top.io/p_2462lelhr2.png")no-repeat center #000;background-size: 25px;}
#rdark_mod2.r_mod2.north4 {display: flex !important;}
.north6{background-color: #000;transition: background-color 0.5s ease;}
#users.north6 .uzr {background-color: #000 !important;border-bottom: 1px solid #1e1e1e !important;}
#dpnl.north6 .nosel.ninr.fl.uzr.label.bg {background-color: #000;}
#settings.north6 .borderg.corner {background-color: #000 !important;border: 0px solid #f4f4f4;}
#d2.north6 .u-msg.break {color: #d7d7d7 !important;}
#d2.north6 .nosel.u-topic.dots.hand {color: #fff !important;background-color: rgba(255, 241, 214, 0) !important;}
#d2.north6 .uzr.d-flex.mm.pmsgc {background-color: #0000 !important;border-bottom: 1px solid #202020 !important;border: 0px solid #171717;}
#d2.north6 .bdel.corner.btn.minix.btn-primary.fa.fa-times {
  background-color: #000 !important;
  border: 1px solid #202020;
}
#settings.north6 .label-primary {background-color: #595959 !important;}
#rooms.north6 .label-primary {background-color: #282828 !important;}
#rooms.north6 .nosel.d-flex.room {background-color: #0000;border-bottom: 1px solid #202020 !important;}
#rooms.north6 .fitimg.u-pic.borderg {
  border: 1px solid #f096a3;
  border-radius: 5px;
}
#users.north6 .nosel.ninr.fl.uzr.label.bg {background-color: #424242 !important;}
#wall.north6 .uzr.d-flex.mm {background-color: #0000;border-bottom: 1px solid #202020 !important;}
#wall.north6 .tablebox.light.d-flex {
  background-color: #242424;
}
#wall.north6 .fitimg.u-pic.borderg {
border: 1px solid #f096a3;
height: 52px !important;
margin-top: 2px;
border-radius: 5px;
box-shadow: inset 0 0 0 rgba(0,0,0,.08),0 0 2px #ff8181;
}
#wall.north6 .u-msg.break {
  color: rgb(255, 255, 255) !important;
}
#wall.north6 .nosel.u-topic.dots.hand {
color: rgb(0, 0, 0) !important;
background-color: rgb(100, 100, 100);
}
#wall.north6 .bdel.corner.btn.minix.btn-primary.fa.fa-times {
  background-color: #000 !important;
  border: 1px solid #202020;
}
#wall.north6 .breply.corner.btn.minix.btn-primary.fa.fa-comments {
  background-color: #000 !important;
  border: 1px solid #2b3a48;
}
#d0.north6 .label-primary {background-color: #000;}
#settings.north6 .borderg.corner {background-color: #3c3b3b !important;border: 0px solid #f4f4f4;}
#d2.north6 {
background-color: #000 !important;
background-image: url("https://k.top4top.io/p_2480440bc1.jpg")!important;
background-size: cover;
}
#settings.north6 {
  background-image: url("https://k.top4top.io/p_2480440bc1.jpg")!important;
  background-size: cover;
}
#wall.north6 #d2bc {
  background-image: url("https://k.top4top.io/p_2480440bc1.jpg")!important;
  background-size: cover;
}
#rooms.north6 {
  background-image: url("https://k.top4top.io/p_2480440bc1.jpg")!important;
  background-size: cover;
}
#chats.north6 {
  background-image: url("https://k.top4top.io/p_2480440bc1.jpg")!important;
  background-size: cover;
}
#d2.north5 {
background-color: #000 !important;
background-image: url("https://b.top4top.io/p_2480032wg1.png");
background-size: cover;
}
#settings.north5 {
  background-image: url("https://b.top4top.io/p_2480032wg1.png");
  background-size: cover;
}
#wall.north5 #d2bc {
  background-image: url("https://b.top4top.io/p_2480032wg1.png");
  background-size: cover;
}
#rooms.north5 {
  background-image: url("https://b.top4top.io/p_2480032wg1.png");
  background-size: cover;
}
#chats.north5 {
  background-image: url("https://b.top4top.io/p_2480032wg1.png");
  background-size: cover;
}
#settings.north6 .label-primary, .btn-primary, .bg-primary {background-color: #595959;}
#d0.north6 .label-primary, .btn-primary {background-color: #000;}
#rooms.north6 .label-primary, .btn-primary {background-color: #000;}
#users.north6 .tbox {background-color: #595959;}
#room.north6 #mic {background-color: #000;}
#room.north6 #mic .mic, #muteall {background-color: #595959;}
#room.north6 .break {background-color: #0000;}
#room.north6 .tablebox.d-flex.footer.fl.light {background-color: #242424;}
#users.north6 .inroom.uzr .u-topic {background-color: rgba(255, 241, 214, 0) !important;color: rgb(215, 215, 215) !important;}
#users.north6 .inroom.uzr{border-radius:5px;border-bottom: 1px solid #1e1e1e !important;background-image: url("https://l.top4top.io/p_24545lyc41.png");}
#users.north6 .inroom.uzr img.ustat {width: 54px !important;border-radius: 0px 50px 50px 50px !important;height: 52px !important;margin-top: -1px;min-height: 0% !important;}
#users.north6 .inroom.uzr .fitimg.u-pic {border-radius: 50px;margin-top: -1px;z-index: 0;margin-left: -53px;}
#d2.north6 .uzr .fitimg.u-pic{
border: 1px solid #f096a3;
margin-top: 2px;
border-radius: 5px;
box-shadow: inset 0 0 0 rgba(0,0,0,.08),0 0 2px #ff8181;
height: 52px !important;
}
#users.north6 .inroom.uzr .u-msg{max-height: 25px !important;text-align:center;background-size:200% auto;-webkit-background-clip:text;-webkit-text-fill-color:#0000;background-image: linear-gradient(225deg,#000 0%,#000 29%,#e54f65 67%,#8e8e8e 100%);}
#users.north6 .inroom.uzr span.uhash{text-transform:uppercase;background-image:linear-gradient(-225deg,#7b7b7b 0,#737373 29%,#e54f65 67%,#3600ff 100%);background-size:220% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;animation:2s linear infinite textclip;display:inline-block}
#users.north6 .inroom.uzr img.co{transform:rotate(20deg);margin-top:2px!important}
#d2.north6 .uzr.d-flex.mm{background-color: #fafafa00 !important;border-bottom: 1px solid #1e1e1e !important;background-image: linear-gradient(-225deg,#0000 0,#0000 29%,#9191910d 67%,#d7d7d700 100%) !important;border-radius:5px;}
#d2.north6 .hmsg {background-color: #000;}
#rooms.north6 .u-topic.dots {
  color: rgb(255, 255, 255) !important;
}
#users.north5 .inroom.uzr{border-radius:5px;border:1px solid #f2b4bd;background-image: url("https://l.top4top.io/p_24545lyc41.png");background-size: cover;border-bottom:1px solid #fffefe}
#users.north5 .inroom.uzr img.ustat {width: 54px !important;border-radius: 0px 50px 50px 50px;height: 52px;margin-top: -1px;min-height: 0% !important;}
#users.north5 .inroom.uzr .fitimg.u-pic {border-radius: 50px;margin-top: 0px;z-index: 0;margin-left: -52px;min-width: 51px;width: 50px;min-height: 48px;max-height: 50px;}
#d2.north5 .uzr .fitimg.u-pic{height: 52px !important;border:1px solid #ea5167;margin-top:2px;border-radius:5px;box-shadow: inset 0 0 0 rgba(0,0,0,.08),0 0 2px #ff8181;}
#users.north5 .inroom.uzr .u-msg{-webkit-text-fill-color: #555;}
#users.north5 .inroom.uzr span.uhash{text-transform:uppercase;background-image: linear-gradient(-225deg,#7b7b7b 0,#737373 29%,#f00 67%,#0e8d37 100%);background-size:220% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;animation:2s linear infinite textclip;display:inline-block}
#users.north5 .inroom.uzr img.co{transform:rotate(20deg);margin-top:2px!important}
#d2.north5 .uzr.d-flex.mm{background-color: #fafafa00 !important;background-size: auto;border-radius:5px;border:0px solid #fffefe;border-bottom:1px solid #fffefe}
`);
var r_north = false;
setInterval(function () {
    if (myroom == '18330b950ffx9914ab32xqjvcmr') {
        if (r_north == false) {
            r_north = true;
		$('#mic').addClass('north3');
		$('#rdark_mod2').addClass('north4');
		$('#room, #d2, #d0, #rooms, #users, #wall, #dpnl, #settings, #chats, #mic #muteall ').addClass('north5');
		$('#room, #d2, #d0, #rooms, #users, #wall, #dpnl, #settings, #chats, #mic #muteall ').addClass('north6');
        }
    } else {
        if (r_north == true) {
            r_north = false;
		$('#mic').removeClass('north3');
		$("#rdark_mod2").removeClass('north4');
	    $("#room, #d2, #d0, #rooms, #users, #wall, #dpnl, #settings, #chats, #mic #muteall ").removeClass('north5');
	    $("#room, #d2, #d0, #rooms, #users, #wall, #dpnl, #settings, #chats, #mic #muteall ").removeClass('north6');
        } 
    } 
}, 10);





$(`<style>
#mic4 {margin-right: 8px !important;}.nosel.d-flex.room.r17ef32d2603xebed46b3-xfg0v0d .corner.fa.fa-user.label.uc.fa-microphone.label-danger {
letter-spacing: 1px;
-webkit-text-fill-color: #fedec8;
background-image: url(https://f.top4top.io/p_2492a2eea1.png);
padding: 2px !important;
border-radius: 0px 0px 10px 10px !important;
}.nosel.d-flex.room.r17ef32d2603xebed46b3-xfg0v0d {background-color: #a2a2a2 !important;display: inline-block;border-radius: 0px 0px 10px 10px;background-image: url("https://k.top4top.io/p_2491h2klq1.gif") !important;background-size: cover;background-size: 110% 80%;}
.nosel.d-flex.room.r17ef32d2603xebed46b3-xfg0v0d .dots.mini.u-msg{
text-align: center;
-webkit-text-fill-color: #ffc74100;
background-image: url(https://c.top4top.io/p_2452tp98x1.gif);
-webkit-background-clip: text;
color: transparent !important;
background-size: 100% 100%;}
.nosel.d-flex.room.r17ef32d2603xebed46b3-xfg0v0d .fitimg.u-pic.borderg{border-radius:5px 5px 5px 5px;border:2px solid #ffdc89;padding-top:30px}
.nosel.d-flex.room.r17ef32d2603xebed46b3-xfg0v0d .u-topic.dots {
  background-size: 99% 100%;
  background-image: url(https://k.top4top.io/p_24911z0ga1.gif);
  color: rgba(222, 142, 62, 0) !important;
}
@keyframes grad{0%{background-position:14% 0}50%{background-position:87% 100%}100%{background-position:14% 0}
	
    </style>`).insertBefore('body');

var rid='17ef32d2603xebed46b3-xfg0v0d';
$("style:eq(0)").append(`#d2 .roomh[onclick="rjoin('${rid}')"]{background-image: linear-gradient(-225deg, #000 0%, #000 29%, #ffb913 67%, #aaa 100%);
background-size: 220% auto;animation: textclip 5s linear infinite;padding: 2px!important;border-radius: 50px !important;border: 1px solid #0000;}`);
$("style:eq(0)").append(`#upro .roomh[onclick="rjoin('${rid}')"]{background-image: linear-gradient(-225deg, #000 0%, #000 29%, #ffb913 67%, #aaa 100%);
background-size: 220% auto;
animation: textclip 5s linear infinite;border-radius: 50px !important;border: 1px solid #0000;}`);

$(`<style>
	#mic.mlok3 .mic{
    border:2px solid;
    border-image: linear-gradient(var(--angle),#e3bb43 0%,#000 29%,#ffbf00 67%,#020202 100%) 1;
	animation:5s rotate linear infinite;
    --angle:0deg;
    background-color:#e3e3e3;
    border-radius:5px!important;
    margin:2px;
    margin-top:1px;
    box-shadow:inset 0 0 0 rgb(0 0 0 / 8%),0 0 1px #fff;height:48px}
    @keyframes rotate{to{--angle:360deg}}@property --angle{syntax:"<angle>";initial-value:0deg;inherits:false}
    </style>`).insertBefore('body');

    $("style").last().append(` 
#users.mlok5 .inroom.uzr img.ustat {width: 54px !important;border-radius: 0px 50px 50px 50px !important;height: 52px !important;margin-top: -1px;min-height: 0% !important;}
#users.mlok5 .inroom.uzr .fitimg.u-pic {box-shadow: inset 0 0 0 rgba(0,0,0,.08),0 0 2px #a21f1f;border: 1px solid #fff;border-radius: 50px;margin-top: -1px;z-index: 0;margin-left: -53px;}
#d2.mlok5 .uzr .fitimg.u-pic{border: 1px solid #fff;margin-top: 2px;border-radius: 50px;box-shadow: inset 0 0 0 rgba(0,0,0,.08),0 0 2px #ffa700;height: 52px !important;}
#users.mlok5 .inroom.uzr .u-msg{max-height: 25px !important;text-align:center;background-size:200% auto;-webkit-background-clip:text;-webkit-text-fill-color:#0000;background-image: linear-gradient(225deg,#000 0%,#000 29%,#972d2d 67%,#8e8e8e 100%);}
#users.mlok5 .inroom.uzr span.uhash{text-transform:uppercase;background-image: linear-gradient(-225deg, #000 0%, #000 29%, #ffb913 67%, #aaa 100%);background-size:220% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;animation:2s linear infinite textclip;display:inline-block}
#users.mlok5 .inroom.uzr img.co{transform:rotate(20deg);margin-top:2px!important}
#d2.mlok5 .uzr.d-flex.mm{border-radius:5px;border:1px solid #fffefe;border-bottom:1px solid #fffefe}
#d2.mlok5 {
background-color: #fafafa !important;
background-image: url("https://k.top4top.io/p_2483ny0xd1.png");
background-size: cover;
}
#settings.mlok5 {
  background-image: url("https://k.top4top.io/p_2483ny0xd1.png");
  background-size: cover;
}
#wall.mlok5 #d2bc {
  background-image: url("https://k.top4top.io/p_2483ny0xd1.png");
  background-size: cover;
  background-color: #fafafa !important;
}
#rooms.mlok5 {
  background-image: url("https://k.top4top.io/p_2483ny0xd1.png");
  background-size: cover;
  background-color: #fafafa !important;
}
#chats.mlok5 {
  background-image: url("https://k.top4top.io/p_2483ny0xd1.png");
  background-size: cover;
  background-color: #fafafa !important;
}
#users.mlok5 .uzr {
  background-color: #0000 !important;}
#users.mlok5 {
  background-image: url("https://k.top4top.io/p_2483ny0xd1.png") !important;
  background-size: cover;
  background-color: #fafafa !important;
}`);
                                
                                var r_mlok=false;setInterval(function (){if (myroom=='17ef32d2603xebed46b3-xfg0v0d'){if (r_mlok==false){r_mlok=true;
								$('#room, #d2, #d0, #rooms, #users, #wall, #dpnl, #settings, #chats, #mic #muteall').addClass('mlok5');
								$('#room, #d2, #d0, #rooms, #users, #wall, #dpnl, #settings, #chats, #mic #muteall').addClass('mlok6');
								$('#mic').addClass('mlok3');
								}}else{if (r_mlok==true){r_mlok=false;
								$("#room, #d2, #d0, #rooms, #users, #wall, #dpnl, #settings, #chats, #mic #muteall").removeClass('mlok5');
								$("#room, #d2, #d0, #rooms, #users, #wall, #dpnl, #settings, #chats, #mic #muteall").removeClass('mlok6');
								$('#mic').removeClass('mlok3');}}}, 10);
					


$(`<style>
.nosel.d-flex.room.r18418dbadafx0e9f728xj2fy1e .corner.fa.fa-user.label.uc.fa-microphone.label-danger {
letter-spacing: 1px;
-webkit-text-fill-color: #fff;
border-radius: 15px 0px 15px 0px !important;
background-color: #d9534f00 !important;
}
.nosel.d-flex.room.r18418dbadafx0e9f728xj2fy1e.bord {border-inline: 1px solid #acaeb3 !important;}
.nosel.d-flex.room.r18418dbadafx0e9f728xj2fy1e {
border-radius: 15px 0px 15px 0px;
display: inline-block;
background-image: url("https://www.icegif.com/wp-content/uploads/rain-icegif-2.gif") !important;
background-repeat: round;
}
.nosel.d-flex.room.r18418dbadafx0e9f728xj2fy1e .dots.mini.u-msg {
text-align: center;
-webkit-text-fill-color: #fff;
-webkit-background-clip: text;
color: transparent !important;
background-size: 100% 100%;
}
.nosel.d-flex.room.r18418dbadafx0e9f728xj2fy1e .fitimg.u-pic.borderg{border-radius: 15px 0px 15px 0px;border: 2px solid #fff;letter-spacing: 1px;background-size: 108% 108%;-webkit-text-fill-color: white;animation: grad 2s cubic-bezier(.445,.05,.55,.95) alternate infinite;}
.nosel.d-flex.room.r18418dbadafx0e9f728xj2fy1e .u-topic.dots {
text-transform: uppercase;
-webkit-text-fill-color: #fff;
animation: textclip 2s linear infinite;
display: inline-block;
font-size: 20px !important;
font-style: normal;
-webkit-background-clip: text;
color: transparent !important;
background-size: 100% 100%;
margin-top: -2px;
margin-left: 5px;}
@keyframes textclip {to {background-position: 200% center;}}</style>`).insertBefore('body');
var rid='18418dbadafx0e9f728xj2fy1e';
$("style:eq(0)").append(`#d2 .roomh[onclick="rjoin('${rid}')"]{animation: textclip 5s linear infinite;
border-radius: 50px !important;
border: 1px solid #0000;
background-image: url(https://f.top4top.io/p_2459lm5g62.gif);
-webkit-background-clip: text;
color: #0000008a !important;
background-size: 100% 100%;
margin-top: -3px;}`);
$("style:eq(0)").append(`#upro .roomh[onclick="rjoin('${rid}')"]{padding: 2px !important;
animation: textclip 5s linear infinite;
border-radius: 50px !important;
border: 1px solid #0000;
font-family: sans-serif;
background-image: url(https://f.top4top.io/p_2459lm5g62.gif);
-webkit-background-clip: text;
color: #0000008a !important;
background-size: 100% 100%;
margin-top: -5px;}`);





$(`<style>#mic.kiom3 .mic {border: 2px solid;border-image: linear-gradient(var(--angle), #14dfe8 0%, #000 29%, #06ecf7 67%, #020202 100%) 1;animation: 5s rotate linear infinite;--angle: 0deg;background-color: #e3e3e3;border-radius: 5px !important;margin: 2px;margin-top: 1px;box-shadow: inset 0 0px 0px rgb(0 0 0 / 8%), 0 0px 1px #ffffff;height: 48px;}@keyframes rotate {
    to {
        --angle: 360deg;
    }
}
@property --angle {
    syntax: "<angle>";
    initial-value: 0deg;
    inherits: false;
}</style>`).insertBefore('body');
$("style").last().append(`
#users.kiom5 .inroom.uzr{
border-radius: 15px 0px 15px 0px;
border:1px solid #26b6bdc2;
border-bottom:1px solid #fffefe
}
#users.kiom5 .inroom.uzr img.ustat {
  width: 54px !important;
  border-radius: 10px 0px 15px 0px;
  height: 52px;
  margin-top: -1px;
  min-height: 0% !important;
}
#users.kiom5 .inroom.uzr .fitimg.u-pic {
  border-radius: 15px 0px 15px 0px;
margin-top: 0px;
z-index: 0;
margin-left: -51px;
min-width: 50px;
width: 50px;
min-height: 48px;
max-height: 50px;
}
#d2.kiom5 .uzr .fitimg.u-pic{
border:1px solid #14dfe8;
margin-top:2px;
border-radius: 10px 0px 10px 0px;
box-shadow: inset 0 0 0 rgba(0,0,0,.08),0 0 2px #ff8181;}
#users.kiom5 .inroom.uzr .u-msg{
-webkit-text-fill-color: #555;
}
#d2.kiom5 {
background-color: #fafafa !important;
background-image: url("https://i.ibb.co/GkZjgrD/image.gif");
background-size: cover;
}
#settings.kiom5 {
  background-image: url("https://i.pinimg.com/originals/43/e1/7a/43e17aa3c2ba523273401a7f7a130a8c.gif");
  background-size: cover;
}
#wall.kiom5 #d2bc {
  background-image: url("https://i.ibb.co/GkZjgrD/image.gif");
  background-size: cover;
  background-color: #fafafa !important;
}
#rooms.kiom5 {
  background-image: url("https://i.ibb.co/GkZjgrD/image.gif");
  background-size: cover;
  background-color: #fafafa !important;
}
#chats.kiom5 {
  background-image: url("https://i.pinimg.com/originals/43/e1/7a/43e17aa3c2ba523273401a7f7a130a8c.gif");
  background-size: cover;
  background-color: #fafafa !important;
}
#users.kiom5 .uzr {
  background-color: #0000 !important;
  color: black;
  }
#users.kiom5 {
  background-image: url("https://i.ibb.co/GkZjgrD/image.gif") !important;
  background-size: cover;
  background-color: #fafafa !important;
}
#users.kiom5 .inroom.uzr span.uhash{
text-transform:uppercase;
background-image: linear-gradient(-225deg,#7b7b7b 0,#737373 29%,#14dfe8 67%,#14dfe8 100%);
background-size:220% auto;
-webkit-background-clip:text;
-webkit-text-fill-color:transparent;animation:2s linear infinite textclip;
display:inline-block}#users.kiom5 .inroom.uzr img.co{transform:rotate(20deg);margin-top:2px!important}
#d2.kiom5 .uzr.d-flex.mm{
border-radius: 15px 0px 15px 0px;
border: 1px solid #fffefe;
  border-bottom-color: rgb(255, 254, 254);
  border-bottom-style: solid;
  border-bottom-width: 1px;
border-bottom: 0px solid #fffefe !important;
background-color: #faf0e600 !important;}`);
var r_kiom = false;
setInterval(function () {
    if (myroom == '18418dbadafx0e9f728xj2fy1e') {
        if (r_kiom == false) {
            r_kiom = true;
$('#room, #d2, #d0, #rooms, #users, #wall, #dpnl, #settings, #chats, #mic #muteall').addClass('kiom5');
            $('#mic').addClass('kiom3');
        }
    } else {
        if (r_kiom == true) {
            r_kiom = false;
$("#room, #d2, #d0, #rooms, #users, #wall, #dpnl, #settings, #chats, #mic #muteall").removeClass('kiom5');
            $('#mic').removeClass('kiom3');
        } 
    } 
}, 10);
