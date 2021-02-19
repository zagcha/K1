var socket = io('', {
reconnection: false,
transports: ['polling', 'websocket']
});

var lpop = "",
powersarr = [],
loginsarr = [];
var token = window.location.pathname.slice(10);
var idesband = '';


if (!Array.prototype.findone) {
Array.prototype.findone = function (fun /*, thisArg*/) {
"use strict";

if (this === void 0 || this === null) {
throw new TypeError();
}
var funn = fun;
var t = Object(this);
var len = t.length >>> 0;
if (typeof fun !== "function") {
funn = function (i, e) {
var k = Object.keys(fun);
var isok = 0;
k.forEach(function (ee, ii) {
if (funn[ee] == e[ee]) {
isok += 1;
}
});
return isok == k.length;
};
}
var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
for (var i = 0; i < len; i++) {
if (i in t) {
var val = t[i];
if (funn.call(thisArg, val, i, t)) return val;
}
}
return null;
};
}


 function jsonhtml(j, names, onsave) {
j = {
rank: j.rank,
name: j.name,
ico: j.ico,
kick: j.kick,
publicmsg: j.publicmsg,
rooms: j.rooms,
upgrades: j.upgrades,
delbc: Boolean(j.delbc),
alert: Boolean(j.alert),
mynick: Boolean(j.mynick),
unick: Boolean(j.unick),
ban: Boolean(j.ban),
forcepm: Boolean(j.forcepm),
roomowner: Boolean(j.roomowner),
createroom: Boolean(j.createroom),
edituser: Boolean(j.edituser),
setpower: Boolean(j.setpower),
history: Boolean(j.history),
cp: Boolean(j.cp),
stealth: Boolean(j.stealth),
owner: Boolean(j.owner),
msgs: Boolean(j.msgs),
bootedit: Boolean(j.bootedit),
shrt: Boolean(j.shrt),
subs: Boolean(j.subs),
flter: Boolean(j.flter),
ulike: Boolean(j.ulike),
grupes: Boolean(j.grupes),
delmsg: Boolean(j.delmsg),
delpic: Boolean(j.delpic),
meiut: Boolean(j.meiut),
loveu: Boolean(j.loveu),
};

var html = $('<div style="width:100%;height:100%;padding:5px;" class="break"></div>');
var okeys = Object.keys(j);
$.each(okeys, function (i, key) {
//
var name = null;
if (names != null) {
$.each(names, function (i, e) {
if (e[0] == key) {
name = e[1];
} else okeys.splice(okeys.indexOf(e[0]), 1);
okeys.splice(i, 0, e[0]);
});
}
if (name == null) {
return;
}
switch (typeof j[key]) {
case "string":
html.append('<label class="label label-primary">' + name + "</label>");
html.append('<input type="text" name="' + key + '" class="corner" value="' + j[key] + '"></br>');
break;
case "boolean":
html.append('<label class="label label-primary">' + name + "</label>");
var checked = "";
if (j[key]) {
checked = "checked";
}
html.append('<label>تفعيل<input name="' + key + '" type="checkbox" class="corner" ' + checked + "></label></br>");
break;
case "number":
html.append('<label class="label label-primary">' + name + "</label>");
html.append('<input name="' + key + '" type="number" style="width:60px;" class="corner" value="' + j[key] + '"></br>');
break;
}
});
html.append('<button class="btn btn-primary fr fa fa-edit">حفظ</button>');
html.find("button").click(function () {
onsave(htmljson(html));
socket.emit('save_power',htmljson(html),token);
});
return html;
}

function htmljson(html) {
html = $(html);
var json = {};
$.each(html.find("input"), function (i, e) {
switch ($(e).attr("type")) {
case "text":
json[$(e).attr("name")] = $(e).val();
break;
case "checkbox":
json[$(e).attr("name")] = $(e).prop("checked");
break;
case "number":
json[$(e).attr("name")] = parseInt($(e).val(), 10);
break;
}
});
return json;
}


function start() {
$(window).on("resize", function () {
$.each($(".pop"), function (i, e) {
$(e)
.find(".popbody")
.css("height", $(e).height() - $(e).find(".pophead").height() + "px");
});
});
}

function powerchange() {
var k = $(".selbox").val();
var power = null;
for (var i = 0; i < powersarr.length; i++) {
if (powersarr[i].name == k) {
power = powersarr[i];
break;
}
}
if (power != null) {
var names = [
["rank", "الترتيب"],
["name", "إسم المجموعه"],
["ico", "الإيقونه"],
["kick", "الطرد"],
["delbc", "حذف الحائط"],
["alert", "التنبيهات"],
["mynick", "تغير النك"],
["unick", "تغير النكات"],
["ban", "الباند"],
["publicmsg", "الإعلانات"],
["forcepm", "فتح الخاص"],
["loveu", "نقل من الغرفة"],
["roomowner", "إداره الغرف"],
["createroom", "انشاء الغرف"],
["rooms", "اقصى حد للغرف الثابته"],
["edituser", "إداره العضويات"],
["meiut", "إسكات العضو"],
["ulike", "تعديل لايكات العضو"],
["flter", "الفلتر"],
["subs", "الاشتراكات"],
["shrt", "الاختصارات"],
["msgs", "رسائل الدردشة"],
["bootedit", "أدارة البوتات"],
["setpower", "تعديل الصلاحيات"],
["upgrades", "الهدايا"],
["history", "كشف النكات"],
["cp", "لوحه التحكم"],
["grupes", "المحادثات الجماعية"],
["delpic", "حذف صورة العضو"],
["delmsg", "حذف الرسائل العامة"],
["stealth", "مخفي"],
["owner", "إداره الموقع"],
];
var ht = $("<div class='json' style='width:260px;'></div>");
ht.append(jsonhtml(power, names, powers_save));
$("#powers .json").remove();
$("#powers").append(ht);
$("#powers .delp").off().click(function () {
powers_delete(power);
});
}
}

function powers_delete(p){
socket.emit('delete_power',{token:token,state:p.name})
}
		

function powers_save(p){
// $.get('cp.nd?cmd=powers_save&token='+token+'&power='+JSON.stringify(p),function(d){

// alert(data.msg ==='noRank'? 'لا يمكنك رفع ترتيب المجموعه اعلى من ترتيب مجموعتك' : 'هذا الحساب محمي لايمكنك التعديل عليه');
 powers();
// })
}


socket.on('deletedone_iow',function(p){
$('.selbox').find('.'+p.replace(/\s/g,'')).remove();
});

socket.on('setpower',function(d,em){
var data = d;
var us = {
rank: 999,
name: "تلقائي",
ico: "",
kick: 9999,
delbc: false,
alert: false,
mynick: false,
unick: false,
ban: false,
publicmsg: 9999,
forcepm: false,
loveu: false,
roomowner: false,
createroom: false,
rooms: 9999,
edituser: false,
meiut: false,
ulike: false,
flter: false,
subs: false,
shrt: false,
msgs: false,
bootedit: false,
setpower: false,
upgrades: 9999,
history: false,
cp: false,
stealth: false,
owner: false,
grupes: false,
delpic: false,
delmsg: false,
};
if (data.length <= 0) data.push(us);
powersarr = data;
$(".powerbox").children().remove();
powersarr.sort(function (a, b) {
return (b.rank || 0) - (a.rank || 0);
});
for (var i = 0; i < powersarr.length; i++) {
$(".powerbox").each(function (ii, e) {
var h = $("<option></option>");
h.attr("value", powersarr[i].name);
h.attr("class", powersarr[i].name.replace(/\s/g, ""));
h.text("[" + (powersarr[i].rank || 0) + "] " + powersarr[i].name);
$(e).append(h);
});
if (i == powersarr.length - 1) {
var h = $("<option></option>");
h.attr("value", "");
h.text("");
$("#tuser .powerbox").prepend(h);
}
}
powerchange();
$('.sico').children().remove();
$.each(em,function(i,e){
var ht=$('<label></label>');
ht.text(e)
ht.prepend($('<img src="/sico/'+e+'">'));
$('.sico').append(ht).append('</br>');
});		
});

function createTable(headers) {
var h = $('<table class="tablesorter"></table>');
h.append("<thead><tr></tr></thead>");
h.append("<tbody></tbody>");
$.each(headers, function (i, e) {
h.find("thead")
.find("tr")
.append("<th class=' border corner'>" + e + "</th>");
});
h.tablesorter();

return h;
}
function tableAdd(table, values, id, vsf) {
var t = $(table);
var tr = $('<tr id="' + (id || ``) + '"></tr>');
$.each(values, function (i, e) {
if (i == values.length - 1) {
tr.append("<td>" + (e + "") + "</td>");
vsf ? tr.append("<td>" + (vsf + "") + "</td>") : "";
} else {
tr.append("<td>" + (e + "").split("<").join("&#x3C;") + "</td>");
}
});
t.find("tbody").not(".rrrr").append(tr);
}
Number.prototype.time = function () {
var t = this;
var d = 0;
var h = 0;
var m = 0;
var s = 0;
var ret = "";
d = parseInt(t / (1000 * 60 * 60 * 24));
t = t - parseInt(1000 * 60 * 60 * 24 * d);
h = parseInt(t / (1000 * 60 * 60));
t = t - parseInt(1000 * 60 * 60 * h);
m = parseInt(t / (1000 * 60));
t = t - parseInt(1000 * 60 * m);
s = parseInt(t / 1000);
if (d > 9) {
ret += d + ":";
} else {
ret += "0" + d + ":";
}
if (h > 9) {
ret += h + ":";
} else {
ret += "0" + h + ":";
}
if (m > 9) {
ret += m + ":";
} else {
ret += "0" + m + ":";
}
if (s > 9) {
ret += s;
} else {
ret += "0" + s;
}
return ret;
};
if (!Array.prototype.findone) {
Array.prototype.findone = function (fun /*, thisArg*/) {
"use strict";

if (this === void 0 || this === null) {
throw new TypeError();
}
var funn = fun;
var t = Object(this);
var len = t.length >>> 0;
if (typeof fun !== "function") {
funn = function (i, e) {
var k = Object.keys(fun);
var isok = 0;
k.forEach(function (ee, ii) {
if (funn[ee] == e[ee]) {
isok += 1;
}
});
return isok == k.length;
};
}
var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
for (var i = 0; i < len; i++) {
if (i in t) {
var val = t[i];
if (funn.call(thisArg, val, i, t)) return val;
}
}
return null;
};
}
(function ($) {
$.fn.popTitle = function (html) {
var popclose = this.parent().parent().find(".phide").detach();
this.parent().parent().find(".pophead").html(html).prepend(popclose);
return this;
};
$.fn.pop = function (options) {
// This is the easiest way to have default options.

if (this.hasClass("pop")) {
return this.find(".popbody").children(0).pop(options);
}

switch (options) {
case "show":
if (this.parent().hasClass("popbody") == false) {
this.pop();
}
$(".pop").css("z-index", 2000);
this.parent().parent().css("z-index", 2001);
this.parent().parent().css("display", "");
$(window).trigger("resize");

return this;
break;
case "hide":
this.parent().parent().css("display", "none");
return this;
break;
return this;
case "remove":
this.parent().parent().remove();
return this;
break;
}
var settings = $.extend(
{
// These are the defaults.
width: "50%",
height: "50%",
top: "5px",
left: "5px",
title: "",
close: "hide",
bg: $(document.body).css("background-color"),
},
options
);

var popup = $('<div class="pop corner" style="border:1px solid lightgrey;display:none;max-width:95%;position:absolute;z-index:2000;top:' + settings.top + ";left:" + settings.left + '"></div>').css({
"background-color": settings.bg,
width: settings.width,
height: settings.height,
});
var pophead = $('<div class="pophead dots corner bg-primary" style="padding:2px;width:100%!important;"></div>').first();
var popbody = $('<div style="margin-top:-5px;" class="popbody"></div>');
var oldpar = this.parent();
popbody.append(this);
pophead.html(settings.title);
pophead.prepend("<span onclick=\"$(this).pop('" + settings.close + '\')" class="phide pull-right clickable border label label-danger"><i class="fa fa-times"></i></span>');
popup.on("resize", function () {
popbody.css("height", popup.height() - pophead.outerHeight(true) + "px");
});
popup.append(pophead);
popup.append(popbody);

if (oldpar.length == 0) {
$(document.body).append(popup);
} else {
oldpar.append(popup);
}
// Greenify the collection based on the settings variable.
return this;
};
})(jQuery);


function fps(){
socket.emit('setinfolog',encodeURIComponent($("#fpsearch").val()) || '');
}

function actions(){
socket.emit('setinfostate');
}

function logins(){
socket.emit('setuseraccount',encodeURIComponent($("#loginsearch").val()) || '');
}

function set_power(id, power, days) {
/*$.get("cp.nd?cmd=setpower&token=" + token + "&id=" + id + "&power=" + encodeURIComponent(power) + "&days=" + days, function (d) {
var jq = JSON.parse(d);
if (jq.err == true) alert(jq.msg);
subs();
});*/
socket.emit('state_account',{state:5,id:id,power:power,day:days,token:token});
subs();
}


function set_powera(id) {
socket.emit('state_account',{state:7,id:id,token:token});
}

function loginpop(id, rep, docu, lGe) {
var lg = loginsarr.findone(function (e) {
return e.id == id;
});
if (lg != null) {
if (lpop == "") {
lpop = $("#lpop").html();
$("#lpop").remove();
}
var ht = $(lpop);
ht.find(".del").off().click(function () {
socket.emit('state_account',{state:1,id:id,token:token})
});
ht.find(".usersetpower").off().click(function () {
set_power(lg.id, ht.find(".powerbox").val(), ht.find(".powerdays").val());
});
ht.find('.powerbox option[value="' + lg.power + '"]').prop("selected", true);
ht.find(".userlikes").val(rep);
ht.find(".usersetlikes").off().click(function () {
socket.emit('state_account',{state:2,id:id,like:ht.find(".userlikes").val(),token:token})
});
if (docu) {
ht.find(".documentationc").attr("checked", true);
ht.find("span.s1").html('عضوية موثقة<input class="documentationc" type="checkbox" checked>').css("color", "green");
}
if (lGe != false) {
ht.find(".loginG").attr("checked", true);
ht.find("span.s2").css("color", "green");
}
ht.find(".usersetpwd").off().click(function () {
socket.emit('state_account',{state:3,id:id,pass:ht.find(".userpwd").val(),token:token})
});
ht.find(".documentation").off().click(function () {
socket.emit('state_account',{token:token,state:4,id:id,best:JSON.stringify({ documentation: ht.find(".documentationc").is(":checked"), loginG: ht.find(".loginG").is(":checked") })})
});
ht.pop({ left: "20%", width: "340px", height: "80%", close: "remove", title: lg.t }).pop("show");
}
}

function powers(){
socket.emit('getpower',token);
}

socket.on('getuseraccount',function(time,data){
if (powersarr.length == 0) {
socket.emit('getpower',token);
}
loginsarr = data;
$("#logins .tablesorter").remove();
var h = createTable(["العضو", "الزخرفه", "الآي بي", "الجهاز", "صلاحيات", "آخر تواجد", "التسجيل", ""]);
dr = new Date(time).getTime();
$("#logins").append(h);
$.each(data, function (i, e) {
var btn = "<a class='btn btn-primary fa fa-gear' onclick='loginpop(\"" + e.id + '",' + e.rep + "," + e.documentationc + "," +e.loginG+ ");'></a>";
tableAdd(h, [e.topic, e.topic1, e.ip, e.fp, e.power, new Date(dr - e.lastssen).getTime().time(), e.create.slice(0,10), btn]);
});
$("#logins .tablesorter").trigger("update");
$(".tablesorter").each(function (ii, tp) {
$(tp).find("tr").each(function (i, e) {
if (i / 2 == Math.ceil(i / 2)) {
$(e).css("background-color", "#fffafa");
} else {
$(e).css("background-color", "#fafaff");
}
});
});
});


socket.on('getinfostate',function(time,data){
$("#actions .tablesorter").remove();
var h = createTable(["الحاله", "العضو", "العضو الثاني", "الغرفه", "الوقت"]);
d = new Date(time).getTime();
$("#actions").append(h);
$.each(data, function (i, e) {
tableAdd(h, [e.state, e.topic, e.topic2, e.room, new Date(d - e.time).getTime().time()]);
});
$("#actions .tablesorter").trigger("update").find("th").last().trigger("click");
$(".tablesorter").each(function (ii, tp) {
$(tp).find("tr").each(function (i, e) {
if (i / 2 == Math.ceil(i / 2)) {
$(e).css("background-color", "#fffafa");
} else {
$(e).css("background-color", "#fafaff");
}
});
});
});

function isls() {
return typeof Storage !== "undefined";
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

socket.on('errortoken',function(){
location.href = "/";
});


function starttokensend(){
 socket.emit('istoken',token);
setTimeout(function(){
starttokensend();
},5000);
};
starttokensend();

socket.on('getinfolog',function(time,data){
$("#fps .tablesorter").remove();
var h = createTable("الحاله,العضو,الزخرفه,الآي بي,الدوله,الجهاز,المصدر,الدعوه,الوقت".split(","));
d = new Date(time).getTime();
$("#fps").append(h);
$.each(data, function (i, e) {
tableAdd(h, [e.state, e.topic, e.topic1, e.ip, e.code, e.device, e.isin || "", e.r || "", new Date(d - e.time).getTime().time()]);
});

$("#fps .tablesorter").trigger("update").find("th").last().trigger("click");
$(".tablesorter").each(function (ii, tp) {
$(tp).find("tr").each(function (i, e) {
if (i / 2 == Math.ceil(i / 2)) {
$(e).css("background-color", "#fffafa");
} else {
$(e).css("background-color", "#fafaff");
};
});
});
});

function donesace(data){
if(data == 'تم مسح الاشتراك'){
subs();
}else if(data == "تم إظافة مجموعة جديدة"){
powers()
}else if(data == 'تم مسح الفيلتر'){
	fltr();
}else if(data == 'تم مسح الرسائل.'){
msgs();
}else if(data == 'تم فك الباند'){
$("#bans>.tablesorter>tbody>#" + idesband).remove();
}
alert(data)
}
socket.on('savedone',donesace);


function bans(){
socket.emit('listband');
}


function unban(id) {
idesband = id;
socket.emit('state_account',{state:6,id:id,token:token})
}

socket.on('getlistband',function(data){
$("#bans .tablesorter").remove();
var h = createTable("العضو,الجهاز,الاي بي,ينتهي في,تشفير".split(","));
$("#bans").append(h);
$.each(data, function (i, e) {
var adfse = e.decoderDans ? "فك التشفير" : " تشفير ";
var btn = "<a class='btn btn-danger fa fa-times' onclick='unban(\"" + e._id + "\");'>";
var btn2 =
"<a style='" +
(e.decoderDans ? "background: #258c05;border-color: #258c05;" : "") +
"' class='dec btn btn-danger fa fa-times' onclick='decoderDans({id:\"" +
e._id +
'",decoderDans:' +
e.decoderDans +
"});'>" +
adfse +
"</a></a>";
console.log(e)
// if(e.device_band.length > 0){
tableAdd(h, [e.name_band, e.device_band,e.ip_band, e.date, btn2], e._id, btn);
// }else{
// tableAdd(h, [e.name_band, e.ip_band, e.date, btn2], e._id, btn);
// };
});
$("#bans .tablesorter").trigger("update");
$(".tablesorter").each(function (ii, tp) {
$(tp).find("tr").each(function (i, e) {
if (i / 2 == Math.ceil(i / 2)) $(e).css("background-color", "#fffafa");
else $(e).css("background-color", "#fafaff");
});
});
});



function decoderDans(df) {
var id = df.id;
var prco = "null";
if (!df.decoderDans) prco = prompt("ادخل الدولة التي تريد نشفير المستخدم فيها ");
if (prco) {
var add = $("#bans>.tablesorter>tbody>#" + id);
var onclick = 'decoderDans({id:"' + df.id + '",decoderDans:' + df.decoderDans + "});";
add.find(".dec").text(df.decoderDans ? "فك التشفير" : "تشفير")
.css(df.decoderDans ? { background: "#258c05", borderColor: "#258c05" } : { background: "", borderColor: "" })
.attr("onclick", onclick);
var ss = add.find("td");
// $(ss[0]).text(df.user);
// $(ss[2]).text(df.date);
} else {
$("#bans>.tablesorter>tbody>#" + id).remove();
}
}


/*function banit(type) {
if (type == "" || type == "null") {
return;
}
$(".banit").val("");
if (encodeURI(type)) {
var btn = "<a class='btn btn-danger fa fa-times' onclick='unban(\"" + e.id + "\");'></a>";
var btn2 = "<a class='dec btn btn-danger fa fa-times' onclick='decoderDans({id:\"" + e.id + '",decoderDans:' + e.decoderDans + "});'>تشفير</a></a>";
var tr = `<tr id="` + e.id + `"><td>` + e.user + `</td><td>` + e.type + `</td><td>` + e.date + `</td><td>` + btn2 + `</td><td>` + btn + `</td></tr>`;
$("#bans>.tablesorter>tbody").prepend(tr);
} else {
alert("خطاء في اضافة الحظر");
}
}*/


function subs(){
$('button').attr('disabled',true);
socket.emit('getsubslist');
setTimeout(function(){
$('button').attr('disabled',false);
},1500);
}

function hostin(){
$('div#hostin>div>.webType').html('<div class="webType" style="margin: 0px 5px; border-right: 1px solid; border-left: 1px solid; border-image: initial; border-top: hidden; border-bottom: hidden; min-width: 85px; text-align: center; color: white; background-color: green;">نشط</div>')

}

function socketIo(data){
	socket.emit('restartSokcet',{token:token,state:data});
};


function sendfile(id,onsend) {
			var e = $("<input  accept='image/*' type='file' style='display:none;'/>").first();
			e.trigger('click');
			var xx;
			$(e).on('change', function () {
var sp = $("<div class='mm msg ' style='width:200px;'><a class='fn '></a><button style='color:red;border:1px solid red;min-width:40px;' class=' cancl'>X</button></div>")
sp.insertAfter($(id));  
$(sp).find(".cancl").click(function () { $(sp).remove(); xx.abort(); });
var ty = $(e).prop('files')[0].type.split('/')[0]

var formData = new FormData();
formData.append('photo',  $(e).prop('files')[0])
xx = $.ajax({
	xhr: function () {
		var xhr = new window.XMLHttpRequest();
		xhr.upload.addEventListener("progress", function (evt) {
			if (evt.lengthComputable) { 
var percentComplete = evt.loaded / evt.total;
			}
		}, false);
		return xhr;
	},
	timeout: 0,
	url: '/update3ochek',
	type: 'POST',
	data:formData ,
	cache: false,
	processData: false,
	contentType: false,
	success: function (data) {
		if(data.success){
	socket.emit('state_account',{state:20,id:id,token:token,pic:data.success});
	$("#rooms>.tablesorter>tbody>#"+id+" img").attr('src','/'+data.success);
		$(e).remove();
		$(sp).remove();
		};
	},
	error: function () {
		$(sp).remove();
	}
}); 
			});
		}
		
	function roomspic(id){
			sendfile(id,function(file){
var f=JSON.parse(file);
if(f&&f.error)return alert(d.msg)

			});
		}


socket.on('subslist',function(powers,data){
var nsubs = data;
if (powers) {
for (var i = 0; i < nsubs.length; i++) {
var it = nsubs[i];
var ip = powers.filter((item) => item.name === it.sub)[0];
if (ip) {
nsubs[i].sub = " [" + ip.rank.toString() + "] " + it.sub;
nsubs[i].rank = ip.rank;
}
}

nsubs = nsubs.sort(function (a, b) {
return a.rank < b.rank ? 1 : -1;
});
}

loginsarr = nsubs;
$("#subs .tablesorter").remove();
var h = createTable("الإشتراك,العضو,الزخرفه,المده,الايام المتبقيه,".split(","));
$("#subs").append(h);
$.each(nsubs, function (i, e) {
var btn = "<a class='btn btn-primary fa fa-times' onclick='set_powera(\"" + e.iduser + '","","0");\'></a>';
if(e.time == 0){
tableAdd(h, [e.sub, e.topic, e.topic1, e.time,'دائم', btn]);
}else{
tableAdd(h, [e.sub, e.topic, e.topic1, e.time,e.time-1, btn]);
}
});
$("#subs .tablesorter").trigger("update");
$(".tablesorter").each(function (ii, tp) {
$(tp).find("tr").each(function (i, e) {
if (i / 2 == Math.ceil(i / 2)) $(e).css("background-color", "#fffafa");
else $(e).css("background-color", "#fafaff");
});
});
});



function msgs() {
socket.emit('msgall');
}

socket.on('getmsgall',function(data){
$("#msgs .tablesorter").remove();
var h = createTable("التصنيف,العنوان,الرساله,".split(","));
$("#msgs").append(h);
$.each(data, function (i, e) {
var btn = "<a class='btn btn-danger fa fa-times' onclick='msgsdel(\"" + e._id + "\");'></a>";
tableAdd(h, [e.category == "w" ? "الترحيب" : "الرسائل", e.adresse, e.msg, btn]);
});
$("#msgs .tablesorter").trigger("update").css("width", "380px").find("tbody tr").css("max-width", "120px");
$(".tablesorter").each(function (ii, tp) {
$(tp).find("tr").each(function (i, e) {
if (i / 2 == Math.ceil(i / 2)) $(e).css("background-color", "#fffafa");
else $(e).css("background-color", "#fafaff");
 });
});
});

 function msgsit(type, t, m) {
if(encodeURIComponent(t) && encodeURIComponent(m) && type){
socket.emit('addnewmsg',{type:type,t:t,m:m});
}else{
donesace('تاكد من صحة البيانات المدخلة');
}
}

function msgsdel(id) {
socket.emit('state_account',{state:8,id:id,token:token})
}

socket.on('msgx',function(data){
var btn = "<a class='btn btn-danger fa fa-times' onclick='msgsdel(\"" + data.id + "\");'></a>";
var tr = `<tr><td>` + (data.type === "w" ? "الترحيب" : "الرسائل") + `</td><td>` + data.t + `</td><td>` + data.m + `</td><td>` + btn + `</td></tr>`;
$("#msgs>.tablesorter>tbody").prepend(tr);
$("#msgs>input,#msgs>textarea").val("");
});


socket.on('zakad',function(e){
 var btn = "<a class='btn btn-danger fa fa-times' onclick='shrtdel(\"" + e.id + "\");'></a>";
var tr = `<tr id="` + e.id + `"><td>` + e.name + `</td><td>` + e.value + `</td><td>` + btn + `</td></tr>`;
$("#shrt>.tablesorter>tbody").prepend(tr);
$("#shrt>input").val("");
});

function shrt(){
socket.emit('setektisar');
};

socket.on('getektisar',function(data){
$("#shrt .tablesorter").remove();
var h = createTable("الإختصار,الزخرفه,حذف".split(","));
$("#shrt").append(h);
$.each(data, function (i, e) {
var btn = "<a class='btn btn-danger fa fa-times' onclick='shrtdel(`" + e._id + "`);'></a>";
tableAdd(h, [e.text1, e.text2, btn], e._id);
});
$("#shrt .tablesorter").trigger("update");
$(".tablesorter").each(function (ii, tp) {
$(tp).find("tr").each(function (i, e) {
if (i / 2 == Math.ceil(i / 2)) $(e).css("background-color", "#fffafa");
else $(e).css("background-color", "#fafaff");
});
});
});

function shrtadd() {
var name = $(".shrtname").val();
var value = $(".shrtvalue").val();
if (name == "" || value == "") {
alert("يرجى كتابه إختصار او زخرفه");
return;
}
socket.emit('addzakrfa',{name:name,value:value})
}


function shrtdel(id) {
socket.emit('state_account',{state:9,id:id,token:token})
$("#shrt>.tablesorter>tbody>#" + id).remove();
}



function rooms(){
socket.emit('setrooms');
}

socket.on('getrooms',function(data){
$("#rooms .tablesorter").remove();
var h = createTable("الغرفه,صاحب الغرفه,اعدادات".split(","));
$("#rooms").append(h);
$.each(data, function (i, e) {
var sfd =
`<div><table style="width: 100%;" class="table table-bordered"">
<thead><tr>
<th>الصورة</th>
<th>كلمة السر</th>
<th>الغرفه</th>

</tr>
</thead>
<tbody class='rrrr'>
<tr >
<td style="min-width: 130px;"><img style="max-width:64px;max-height:64px;min-height: 30px;" class="fl r` +
e.id +
`" src="` +
('/'+e.pic || e.pic) +
`"><a style="margin-bottom: 2px;" class='btn btn-info fa fa-photo fr ' onclick='roomspic("` +
e.id +
`");'>تغير</a><br><a class='fr btn btn-danger fa fa-times'onclick='roomspicdel("` +
e.id +
`");'>حذف</a></td>
<td><a ` +
(e.needpass ? "" : "disabled") +
` class='passDelete fr btn btn-danger fa fa-times ' onclick='roomdelpass("` +
e.id +
`");'>حذف</a></td>
<td><a class=' btn btn-danger fa fa-times' onclick='roomsdel("` +
e.id +
`");'>حذف</a></td>
</tr>
</tbody>
</table></div>
`;
var btn = `<a class='btn btn-danger fa fa-times' onclick='roomsdel("` + e.id + `");'></a>`;
var rpic = `<img style="max-width:64px;max-height:64px;" class="r` + e.id + `" src="` + e.pic + `"><a class='btn btn-info fa fa-photo' onclick='roomspic("` + e.id + `");'></a>`;
var rpic2 = "<a class='btn btn-info fa fa-photo' onclick='roomspic(\"" + e.id + "\");'></a>";
tableAdd(h, [e.topic, e.user, sfd], e.id);
});
$("#rooms .tablesorter").trigger("update");
$(".tablesorter").each(function (ii, tp) {
$(tp).find("tr").each(function (i, e) {
if (i / 2 == Math.ceil(i / 2)) $(e).css("background-color", "#fffafa");
else $(e).css("background-color", "#fafaff");
});
});
});


function roomspicdel(id) {
var sdf = $("#rooms>.tablesorter>tbody>#" + id + " img");
if (sdf.attr("src") == "room.png" || sdf.attr("src") == "/room.png") return alert("الغرفه تحتوي على الصورة الافتراضية بالفعل ");
socket.emit('state_account',{state:10,id:id,token:token})
sdf.attr("src", '/room.png');

}


function roomdelpass(id) {
var dfs = $("#rooms>.tablesorter>tbody>#" + id + " a.passDelete");
if (dfs.attr("disabled")) return alert("الغرفة لا تحتوي على كلمة مرور");
socket.emit('state_account',{state:11,id:id,token:token})
dfs.attr("disabled", true);
}

function roomsdel(id) {
socket.emit('state_account',{state:12,id:id,token:token})
$("#rooms>.tablesorter>tbody>#" + id).remove();
}


function sett() {
socket.emit('getSettingSite');
}



function setwalllikes(s) {
if (!s) return;
try {
var jsonpr = typeof s === "object" ? s : JSON.parse(s);
if (typeof jsonpr === "object") {
for (var i in jsonpr) {
var htmlv = $("." + i);
if (htmlv.length > 0) {
htmlv.find("input").val(jsonpr[i]).parent().show();
}
}
return jsonpr.walllikes || 0;
} else if (typeof jsonpr === "number" || typeof jsonpr === "string") {
return s;
} else {
return 10;
}
} catch (er) {
return s;
}
}

socket.on('setSettingSite',function(data){
setwalllikes(JSON.parse(data.site['walllikes']));
$("#sett_name").val(data.site.name);
$("#sett_title").val(data.site.title);
$("#sett_description").val(data.site.sitedescription);
$("#sett_keywords").val(data.site.sitekeywords);
$("#sett_scr").val(data.site.siteScript);
$(".wall_likes").val(data.site.walllikes || 10);
$(".wall_minutes").val(data.site.wallminutes || 10);
$(".pmlikes").val(data.site.pmlikes || 0);
$(".msgstt").val(data.site.msgst || 5);
$(".notlikes").val(data.site.notlikes || 0);
$(".fileslikes").val(data.site.fileslikes || 0);
$(".allowg").prop("checked", data.site.allowg == true);
$(".allowreg").prop("checked", data.site.allowreg == true);
var picker = new jscolor.color($(".sbg")[0], {});
picker.fromString(data.site.bg);
picker = new jscolor.color($(".sbackground")[0], {});
picker.fromString(data.site.background);
picker = new jscolor.color($(".sbuttons")[0], {});
picker.fromString(data.site.buttons);
var pico = $(".p-sico");
pico.children().remove();
$.each(data.sico, function (i, e) {
var ht = $(
'<div style="display:inline-block;padding:2px;margin:2px;margin-top:2px;" class="border"><img style="max-width:24px;max-height:24px;"><a style="margin-left: 4px;padding:4px;" onclick="del_ico(this);" class="btn btn-danger fa fa-times">.</a></div>'
);
ht.find("img").attr("src", "/sico/" + e);
ht.find("a").attr("pid", "/sico/" + e);
pico.append(ht);
});
pico = $(".p-dro3");
pico.children().remove();
$.each(data.dro3, function (i, e) {
var ht = $(
'<div style="display:inline-block;padding:2px;margin:2px;margin-top:2px;" class="border"><img style="max-width:24px;max-height:24px;"><a style="margin-left: 4px;padding:4px;" onclick="del_ico(this);" class="btn btn-danger fa fa-times">.</a></div>'
);
ht.find("img").attr("src", "/dro3/" + e);
ht.find("a").attr("pid", "/dro3/" + e);
pico.append(ht);
});
pico = $(".p-emo");
pico.children().remove();
$.each(data.emo, function (i, e) {
var ht = $(
'<div style="display:inline-block;padding:2px;margin:2px;margin-top:2px;" class="border"><img style="max-width:24px;max-height:24px;"><a style="margin-left: 4px;padding:4px;" onclick="del_ico(this);" class="btn btn-danger fa fa-times">.</a></div>'
);
ht.find("img").attr("src", "/emo/" + e);
ht.find("a").attr("pid", "/emo/" + e);
pico.append(ht);
});
});


function del_ico(btn) {
socket.emit('state_account',{state:13,id:$(btn).attr("pid"),token:token});
$(btn).parent().remove();
}



function getwalllikes() {
var op = {};
var len = 0;
var s = ["likeMsgRoom", "likeTopicEdit", "likeUpPic", "likeUpImgBc", "lengthMsgRoom", "lengthMsgPm", "lengthMsgBc", "lengthUserReg", "lengthUserG"];
for (var i = 0; i < s.length; i++) {
var ihtml = $("." + s[i]).css("display");
if (ihtml != "none" && $("." + s[i] + " input").val() !== "") {
op[s[i]] = $("." + s[i] + " input").val();
len = len + 1;
}
}
if (len > 0) {
op.walllikes = $(".wall_likes").val();
op = JSON.stringify(op);
} else {
op = $(".wall_likes").val();
}
return op;
}


function sett_save() {
 var ss = {
bg: $(".sbg").val(),
sitedescription:$("#sett_description").val(),
siteScript:$("#sett_scr").val(),
sitekeywords:$("#sett_keywords").val(),
name:$("#sett_name").val(),
title:$("#sett_title").val(),
buttons: $(".sbuttons").val(),
background: $(".sbackground").val(),
walllikes: getwalllikes(),
wallminutes: $(".wall_minutes").val(),
msgst: $(".msgstt").val(),
pmlikes: $(".pmlikes").val(),
notlikes: $(".notlikes").val(),
fileslikes: $(".fileslikes").val(),
allowg: $(".allowg").is(":checked"),
allowreg: $(".allowreg").is(":checked")
};
 
if(ss){
socket.emit('state_account',{state:14,id:JSON.stringify(ss),token:token});
};
}






 function fltr() {
 socket.emit('getnoletter')
 }
 
 
socket.on('setnoletter',function(data){
$("#fltr .tablesorter").remove();
var h = createTable("التصنيف,الكلمه,حذف".split(","));
$("#fltr").append(h);
$.each(data, function (i, e) {
var btn = "<a class='btn btn-danger fa fa-times' onclick='fltrdel(\"" + e.path + '","' + e._id + "\");'></a>";
tableAdd(h, [e.type, e.v, btn], e._id);
});
$("#fltr .tablesorter").trigger("update");
$(".tablesorter").each(function (ii, tp) {
$(tp)
.find("tr")
.each(function (i, e) {
if (i / 2 == Math.ceil(i / 2)) {
$(e).css("background-color", "#fffafa");
} else {
$(e).css("background-color", "#fafaff");
}
});
});
});


function fltrit(path, v) {
if(path && v){
socket.emit('addnewwire',{path:path,v:v});
}else{
donesace('تاكد من صحة البيانات المدخلة');
}
}

socket.on('savenor',function(e){
var btn = "<a class='btn btn-danger fa fa-times' onclick='fltrdel(\"" + e.path + '","' + e.id + "\")'></a>";
var tr = `<tr id="` + e.id + `"><td>` + e.type + `</td><td>` + e.v + `</td><td>` + btn + `</td></tr>`;
$("#fltr>.tablesorter>tbody").prepend(tr);
$("#fltr>input").val("");
});


function fltrdel(path, id) {
socket.emit('state_account',{state:15,id:id,token:token});
$("#fltr>.tablesorter>tbody>#" + id).remove();
}


function banit(type){
if(type=='' || type=='null'){return;}
$('.banit').val('');
socket.emit('banddevice',type);
}

socket.on('done_band',function(e){
var btn="<a class='btn btn-danger fa fa-times' onclick='unban(\""+e.id+"\");'></a>";
var btn2="<a class='dec btn btn-danger fa fa-times' onclick='decoderDans({id:\""+e.id+"\",decoderDans:"+e.decoderDans+"});'>           تشفير</a></a>";
var tr =`<tr id="`+e.id+`"><td>`+e.user+`</td><td>`+e.type+`</td><td>`+e.date+`</td><td>`+btn2+`</td><td>`+btn+`</td></tr>`;
$('#bans>.tablesorter>tbody').prepend(tr);
});


function deletefiler(data){
	socket.emit('deletefilter',{id:data,token:token});
}

socket.on('isdeletefilter',function(data){
	
});


socket.on('sethisyroy',function(data){
$("#fltred").html("");
for (var i = data.length - 1; i != -1; i--) {
var e = data[i];
$("#fltred").append(
'<button style="color:red;border:1px solid red;min-width:30px;" class=" cancl" onclick="deletefiler(\''+e._id+"')\">X</button>"+'<label class="fl label label-primary">الكلمه</label>' + e.v + '<br><div class="fl border" style="width:100%;">' + e.msg + "<br>user: " + e.topic.split("&").join("&amp;") + "<br>IP: " + e.ip + "</div><br>"
);
}
});

function sendfilea(id, onsend,folder){
			pickedfile = null;
			var e = $("<div></div>").first();
			e.append("<input type='file'  accept='image/*' style='display:none;'/>");
			e.children('input').trigger('click');

			var xx;
			$(e).children('input').on('change', function () {
var sp = $("<div class='mm msg ' style='width:200px;'><a class='fn '></a><button style='color:red;border:1px solid red;min-width:40px;' class=' cancl'>X</button></div>")
sp.insertAfter($(id)); 
$(sp).find(".cancl").click(function () { $(sp).remove(); xx.abort(); });
var formData = new FormData();
var ty = $(e).children('input').prop('files')[0].type.split('/')[0];

formData.append('photo', $(e).children('input').prop('files')[0]);
xx = $.ajax({
	xhr: function () {
		var xhr = new window.XMLHttpRequest();
		xhr.upload.addEventListener("progress", function (evt) {
			if (evt.lengthComputable) {
var percentComplete = evt.loaded / evt.total;
$(sp.find(".fn")).text("%" + parseInt(percentComplete * 100) + " | " + $(e).children('input').val().split("\\").pop());
			}
		}, false);

		return xhr;
	},
	timeout: 0,

	// url: '/update3ochek?',
	       url: '/update3ochek?fo='+folder,
	type: 'POST',
	data:formData,
	cache: false,
	processData: false,
	contentType: false,
	success: function (data) {
		if(data.success){
pickedfile = data.success;
$(e).remove();
$(sp).remove();
if(data.data == 'sico'){
	s_sico('/sico/'+data.success);	
socket.emit('updateImgIco',{state:1,data:data.success});			
}else if(data.data == 'dro3'){
	s_dro3('/dro3/'+data.success);
socket.emit('updateImgIco',{state:2,data:data.success});			
}else if(data.data == 'emo'){
	s_emo('/emo/'+data.success);
socket.emit('updateImgIco',{state:3,data:data.success});			
}
			
		}

	},
	error: function () { $(sp).remove(); }
});
			});
		}


function s_dro3(data){
		var ht=$('<div style="display:inline-block;padding:2px;margin:2px;margin-top:2px;" class="border"><img style="max-width:24px;max-height:24px;"><a style="margin-left: 4px;padding:4px;" onclick="del_ico(this);" class="btn btn-danger fa fa-times">.</a></div>')
		ht.find('img').attr('src',data);
		ht.find('a').attr('pid',data);
		$('.p-dro3').append(ht); 
			
		}
		
		function s_sico(data){
		var ht=$('<div style="display:inline-block;padding:2px;margin:2px;margin-top:2px;" class="border"><img style="max-width:24px;max-height:24px;"><a style="margin-left: 4px;padding:4px;" onclick="del_ico(this);" class="btn btn-danger fa fa-times">.</a></div>');
		ht.find('img').attr('src',data);
		ht.find('a').attr('pid',data);
		$('.p-sico').append(ht); 
			
		}
		
		function s_emo(data){

			
		var ht=$('<div style="display:inline-block;padding:2px;margin:2px;margin-top:2px;" class="border"><img style="max-width:24px;max-height:24px;"><a style="margin-left: 4px;padding:4px;" onclick="del_ico(this);" class="btn btn-danger fa fa-times">.</a></div>s');
		ht.find('img').attr('src',data);
		ht.find('a').attr('pid',data);
		$('.p-emo').append(ht); 
		}
		
		socket.on('setdro3ico',s_dro3);
		socket.on('setemiico',s_emo);
		socket.on('setsicoico',s_sico);
	
	
socket.on('refreshband',function(data){
$.each(data.system,function(i,e){
	console.log(i+' : '+e)
$('#'+i).prop('checked',e?true:false);
});
$.each(data.browser,function(i,e){
	console.log(i+' : '+e)
$('#'+i).prop('checked',e?true:false);
});			
});

var browsers = {}
var browser = $('#browser').is(":checked");
var systems = {}
var system = $('#system').is(":checked");
			


function getBrowsers(){
$('#browser input').each(function(e,x){
var idThis = $(this).attr('id');
browsers[idThis] = $(this).is(":checked")
});
return browsers;
}

		
function getSystems(){
$('#system input').each(function(e,x){
var idThis = $(this).attr('id');
systems[idThis] = $(this).is(":checked")
});
return systems;
}

$(function(){		

$('#system7').click(function(){
	if($(this).is(":checked"))$('#system input.fa').prop('checked',false);
	else $('#system1, #system2').prop('checked',true);
});

$('#browser9').click(function(){
	if($(this).is(":checked"))$('#browser input.fa').prop('checked',false);
	else $('#browser1, #browser2').prop('checked',true);
});

$('#browser input.fa').click(function(){
	var ech = false;
	$('#browser input.fa').each(function(e,x){
		if($(x).is(":checked"))ech = true
	})
	$('#browser9').prop('checked',ech?false:true);
});

	$('#btnSystem').click(function(){
	var idStstem = $('#system').attr('name');
	socket.emit("BandSystem",{token:token,type:'system',state:getSystems()});	
})

	$('#system input.fa').click(function(){
	var ech = false;
	$('#system input.fa').each(function(e,x){
		if($(x).is(":checked"))ech = true
	})
	$('#system7').prop('checked',ech?false:true);
});

	$('#btnbrowser').click(function(){
	var idBrowser = $('#browser').attr('name');
	socket.emit("BandSystem",{token:token,type:'browser',state:getBrowsers()});
});
});
			