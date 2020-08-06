var e = getApp().requirejs("core");

module.exports.getAreas = function(s) {
    e.get("shop/get_areas", {}, function(e) {
        var r = [];
        for (var a in e.areas.province) if (0 != a) {
            e.areas.province[a]["@attributes"].name;
            var t = [];
            for (var i in e.areas.province[a].city) if (0 != i) {
                var n = [];
                for (var c in e.areas.province[a].city[i].name, e.areas.province[a].city[i].county) {
                    if (e.areas.province[a].city[i].county[c].hasOwnProperty("@attributes")) var o = e.areas.province[a].city[i].county[c]["@attributes"].name; else o = e.areas.province[a].city[i].county[c].name;
                    n.push(o);
                }
                t.push({
                    city_name: n
                });
            }
            r.push({
                province_name: t
            });
        }
        "function" == typeof s && s(e.areas);
    });
};