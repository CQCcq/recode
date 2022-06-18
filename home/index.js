var onOff = false;
var selectValue = 1;
let param = {
  args1: 1,
  args2: 50,
  args3: 15,
  args4: 0,
};
document.getElementById("check").onclick = function () {
  if (onOff) {
    document.getElementsByTagName("h3")[0].innerHTML = "未使用";
    startBut(0);
  } else {
    document.getElementsByTagName("h3")[0].innerHTML = "使用中";
    startBut(1);
  }
  onOff = !onOff;
  forbidFun();
};
forbidFun();
startBut;
const dd = document.getElementsByTagName("Button");
for (const i in dd) {
  dd[i].onclick = function () {
    selectValue = this.value;
    switchTabs();
  };
}
switchTabs();
function switchTabs() {
  const dd = document.getElementsByTagName("Button");
  for (const i in dd) {
    if (i < dd.length) {
      if (dd[i].value == selectValue) {
        dd[i].style.color = "white";
        dd[i].style.backgroundColor = "#0de70d";
        param.args1 = selectValue;
        getAjax(param);
      } else {
        dd[i].style.color = "white";
        dd[i].style.backgroundColor = "#409eff";
      }
    }
  }
}

var doc = document.getElementsByTagName("input");
for (let i in doc) {
  if (i < doc.length) {
    if (doc[i].type === "range") {
      doc[i].onchange = function () {
        if (this.max == 100) {
          param.args2 = this.value;
          document.getElementsByTagName(
            "h4"
          )[0].innerHTML = `频率(${this.value}HZ)`;
        }
        if (this.max == 30) {
          param.args3 = this.value;
          document.getElementsByTagName(
            "h4"
          )[1].innerHTML = `强度(${this.value}MA)`;
        }
        getAjax(param);
      };
    }

    if (doc[i].type === "radio") {
      doc[i].onclick = function () {
        param.args4 = this.value;
        getAjax(param);
      };
    }
  }
}

function startBut(num) {
  ajaxReq(
    {
      url: "http://localhost:9000/api/Start",
      method: "post",
      param: {
        type: num, // 类型:1开始，0结束，2暂停
      },
    },
    function (res) {
      // console.log(res);
    }
  );
}

function getAjax(args) {
  ajaxReq(
    {
      url: "http://localhost:9000/api/Parameters",
      method: "post",
      param: {
        wavetype: args.args1, //波形:1疏密波，2连续波，3断续波
        frequency: args.args2, //频率：0到100
        strength: args.args3, //强度：1到30
        curetime: args.args4, //治疗时长（分钟）
      },
    },
    function (res) {
      // console.log(res);
    }
  );
}

function ajaxReq(param, fun) {
  var xmlhttp;
  if (window.XMLHttpRequest) {
    xmlhttp = new XMLHttpRequest();
  } else {
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      fun(xmlhttp.responseText);
    }
  };
  xmlhttp.open(param.method, param.url, true);
  var dd = JSON.stringify(param.param);
  xmlhttp.send(dd);
}

function forbidFun() {
  const dd = document.getElementsByTagName("Button");
  for (const i in dd) {
    if (i < dd.length) {
      if (!onOff) {
        dd[i].disabled = true;
      } else {
        dd[i].disabled = false;
      }
    }
  }
  var doc = document.getElementsByTagName("input");
  for (let i in doc) {
    if (i < doc.length) {
      if (doc[i].type != "checkbox") {
        if (!onOff) {
          doc[i].disabled = true;
        } else {
          doc[i].disabled = false;
        }
      }
    }
  }
}
