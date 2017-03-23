﻿define(['jquery', 'jquery.cookie'], function ($) {
    var baseUrl = "http://"+window.location.hostname+":8021/efwapi/";
    function simpleAjax(requestUrl, requestData, callback,errorback) {
        $.ajax({
            type: "get",
            url: baseUrl+requestUrl,
            data: requestData,
            success: function (retdata) {
                if (callback)
                    callback(retdata);
            },
            error: function () {
                if (errorback)
                    errorback();
            }
        });
    }
    function postAjax(requestUrl, requestData, callback, errorback) {
        $.ajax({
            type: "post",
            url: baseUrl+requestUrl,
            data: requestData,
            success: function (retdata) {
                if (callback)
                    callback(retdata);
            },
            error: function () {
                if (errorback)
                    errorback();
            }
        });
    }
    function validateuser() {
        var token = $.cookie("token");
        simpleAjax('login/validatetoken', { token: token }, function (data) {
            if (!data.flag) {
                $.cookie("token", null);//注销就删除cookie
                window.location.href = 'login.html';
            } else {
                $('#username').text(data.username);
            }
        }, function () {
            window.location.href = 'login.html';
        });
    }
    function isJson(obj) {
        var isjson = typeof (obj) == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length;
        return isjson;
    }

    function toJson(value) {
        try {
            if (!isJson(value)) {
                return eval('(' + value + ')');
            } else {
                return value;
            }
        }
        catch (er) {
            return value;
        }
    }

    return {
        baseUrl:baseUrl,
        simpleAjax: simpleAjax,
        postAjax:postAjax,
        validateuser: validateuser,
        isJson: isJson,
        toJson: toJson
    };
});