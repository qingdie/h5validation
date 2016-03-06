
(function ($, vfn, vfning) {
    var t = this;
    var currentForm = null, ele = null;
    function getele() {
        var fs = [];
        var f;
        for (var i = 0; i < currentForm[0].length; i++) {
            f = currentForm[0][i];
            if (f.offsetHeight > 0 && (!f.type || "submit,button,reset,image".indexOf(f.type.toLocaleString()) === -1 && !f.disabled)) {
                fs.push(f);
            }
        }
        return fs;
    };
    function fmtmsg(msg, v) {
        return msg && msg.replace && msg.replace('{0}', v);
    };
    this.validate = function (form, all) {
        currentForm = $(form);
        ele = getele();
        var end = all === true;
        var isvali = true;
        for (var i = 0; i < ele.length; i++) {
            if (!t.valid(ele[i], t.showmsg)) {
                isvali = false;
                if (!end) return false;
            }
        }
        return isvali;
    },
    this.valiing = function (form) {
        currentForm = $(form);
        ele = getele();
        for (var i = 0; i < ele.length; i++) {
            if (!t.valid(ele[i], t.showmsging, false)) {
                $(ele[i]).keyup(function () {
                    t.valid(this, t.showmsging);
                });
                $(ele[i]).change(function () {
                    t.valid(this, t.showmsging);
                });
            }
        }
    },
    this.valid = function (e, fnmsg, focus) {
        var $e = $(e);
        e = $e[0];
        var v = $e.val().replace(/(^\s*)|(\s*$)/g, "");
        //验证是否必须输入
        if (v.length === 0) {
            fnmsg && fnmsg(e.title || t.messages.required, e, 'required', false);
            return false;
        }
        //验证type项
        var vr = e.getAttribute('type') && e.getAttribute('type').toLowerCase();
        var m;
        if (vr && vr !== "text" && t.methods[vr] && !t.methods[vr](v, e, vr)) {
            m = e.title || t.messages[vr];
            fnmsg && fnmsg(m, e, vr, false);
            $e.focus();
            return false;
        }
        //验证特性项
        for (var i = 0; i < t.features.length; i++) {
            var f = t.features[i];
            if (typeof (f) === 'string') {
                vr = e.getAttribute(f);
                if (vr === "") vr = f;
                if (vr && t.methods[f] && !t.methods[f](v, e, vr)) {
                    m = $e.attr(f + 'msg') || e.title || fmtmsg(t.messages[f], vr);
                    fnmsg && fnmsg(m, e, vr, false);
                    $e.focus();
                    return false;
                }
            }
        }
        fnmsg && fnmsg("", e, '', true);
        return true;
    },
    this.features = ['min', 'max', 'number', 'minlength', 'maxlength', 'chs', 'zip', 'qq', 'tel', 'mobile', 'phone', 'idcard', 'pattern', 'equalto'],
    this.methods = {
        required: function (v, e) {
            switch (e.nodeName.toLowerCase()) {
                case 'select':
                    return v && v.length > 0;
                case 'input':
                    if (this.checkable(e))
                        return this.findByName(e.name).filter(':checked').length;
            }
            return $.trim(v).length > 0;
        },
        min: function (v, e, p) {
            return this.pattern(v, e) || parseInt(v) >= parseInt(p);
        },
        max: function (v, e, p) {
            return this.pattern(v, e) || parseInt(v) <= parseInt(p);
        },
        minlength: function (v, e, p) {
            return this.pattern(v, e) || this.getLength($.trim(v), e) >= parseInt(p);
        },
        maxlength: function (v, e, p) {
            return this.pattern(v, e) || this.getLength($.trim(v), e) <= parseInt(p);
        },
        email: function (v, e) {
            return this.pattern(v, e) || /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test(v);
        },
        url: function (v, e) {
            return this.pattern(v, e) || this.isurl(v);
        },
        number: function (v, e) {
            return this.pattern(v, e) || /^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/.test(v);
        },
        chs: function (v, e) {
            return this.pattern(v, e) || /^[\u0391-\uFFE5]+$/.test(v);
        },
        zip: function (v, e) {
            return this.pattern(v, e) || /^[1-9]\d{5}$/.test(v);
        },
        qq: function (v, e) {
            return this.pattern(v, e) || /^[1-9]\d{4,10}$/.test(v);
        },
        tel: function (v, e) {
            return this.mobile(v, e) || this.phone(v, e);
        },
        mobile: function (v, e) {
            return this.pattern(v, e) || /^((\(\d{2,3}\))|(\d{3}\-))?1\d{10}$/.test(v);
        },
        phone: function (v, e) {
            return this.pattern(v, e) || /^(\(\d{3,4}\)|\d{3,4}-)?\d{7,8}$/.test(v);
        },
        idcard: function (v1, e) {
            var isDateTime = function () {
                var time = new Date(this);
                var m = (time.getMonth() + 1);
                var d = time.getDate();
                var f = time.getFullYear() + '-' + (m > 9 ? m : '0' + m) + '-' + (d > 9 ? d : '0' + d);
                return this.toString() === f;
            };
            var idCard = function (value) {
                if (value.length === 18 && 18 !== value.length) return false;
                var number = value.toLowerCase();
                var d, sum = 0, v = '10x98765432', w = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2], a = '11,12,13,14,15,21,22,23,31,32,33,34,35,36,37,41,42,43,44,45,46,50,51,52,53,54,61,62,63,64,65,71,81,82,91';
                var re = number.match(/^(\d{2})\d{4}(((\d{2})(\d{2})(\d{2})(\d{3}))|((\d{4})(\d{2})(\d{2})(\d{3}[x\d])))$/);
                if (re == null || a.indexOf(re[1]) < 0) return false;
                if (re[2].length === 9) {
                    number = number.substr(0, 6) + '19' + number.substr(6);
                    d = ['19' + re[4], re[5], re[6]].join('-');
                } else d = [re[9], re[10], re[11]].join('-');
                if (!isDateTime.call(d)) return false;
                for (var i = 0; i < 17; i++) sum += number.charAt(i) * w[i];
                return (re[2].length === 9 || number.charAt(17) === v.charAt(sum % 11));
            };
            return this.pattern(v1, e) || idCard(v1);
        },
        equalto: function (v, e, p) {
            return v === $(p).val();
        },
        checkable: function (element) {
            return /radio|checkbox/i.test(element.type);
        },
        findByName: function (name) {
            var form = this.currentForm;
            return $(document.getElementsByName(name)).map(function (index, element) {
                return element.form === form && element.name === name && element || null;
            });
        },
        getLength: function (value, element) {
            switch (element.nodeName.toLowerCase()) {
                case 'select':
                    return $("option:selected", element).length;
            }
            return value.length;
        },
        pattern: function (v, e) {
            return e.pattern && new RegExp(e.pattern, "g").test(v);
        },
        isurl: function (url) {
            var strRegex = '^((https|http|ftp|rtsp|mms)?://)'
           + '?(([0-9a-z_!~*\'().&=+$%-]+: )?[0-9a-z_!~*\'().&=+$%-]+@)?' //ftp的user@ 
           + '(([0-9]{1,3}.){3}[0-9]{1,3}' // IP形式的URL- 199.194.52.184 
           + '|' // 允许IP和DOMAIN（域名） 
           + '([0-9a-z_!~*\'()-]+.)*' // 域名- www. 
           + '([0-9a-z][0-9a-z-]{0,61})?[0-9a-z].' // 二级域名 
           + '[a-z]{2,6})' // first level domain- .com or .museum 
           + '(:[0-9]{1,4})?' // 端口- :80 
           + '((/?)|' // a slash isn't required if there is no file name 
           + '(/[0-9a-z_!~*\'().;?:@&=+$,%#-]+)+/?)$';
            var re = new RegExp(strRegex);
            return re.test(url);
        }
    },
    this.messages = {
        required: '什么都不写么？',
        pattern: '不符合验证规则',
        max: "请输入一个小于或等于{0}的值",
        min: "请输入一个大于或等于{0}的值",
        maxlength: "长度应小于{0}位",
        minlength: "长度应大于{0}位",
        email: "邮箱地址这样不对吧！",
        url: "邮箱地址这样不对吧！",
        number: "只能输入数字哦！",
        chs: '只能输入汉字哦！',
        zip: '邮政编码不正确！',
        qq: 'QQ号码不正确！',
        tel: '电话号码不正确',
        mobile: '手机号码不正确！',
        phone: '固定电话号码不正确！',
        idcard: '请输入正确的身份证号码',
        equalto: '输入不匹配'
    },
    this.showmsg = vfn || function (msg, e, m, ok) {

    },
    this.showmsging = vfning || function (msg, e, m, ok) {

    },
    this.showmsgingobj = null;
    $.fn.validate = function (all) {
        t.validate(this, all);
    };
    $.fn.valiing = function () {
        t.valiing(this);
    };
    $.h5validate = t;
})($, function (msg, e, m, ok) {
    if (ok) {
        $(e).removeClass('err').next().remove();
    } else {
        $(e).next().remove();
        $(e).addClass('err').parent().append('<span class="errmsg">' + msg + '</span>');
    }
   
}, function (msg, e, m, ok) {
    if (ok) {
        $(e).removeClass('err').next().remove();
    } else {
        $(e).next().remove();
        $(e).addClass('err').parent().append('<span class="errmsg">' + msg + '</span>');
    }
});
