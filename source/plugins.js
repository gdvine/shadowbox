/**
 * Contains plugin support information. Each property of this object is a
 * boolean indicating whether that plugin is supported. Keys are:
 *
 * - fla: Flash player
 * - qt: QuickTime player
 *
 * @type    {Object}
 * @public
 */
S.plugins = {};

if (navigator.plugins && navigator.plugins.length) {
    var names = [];
    each(navigator.plugins, function(i, p) {
        names.push(p.name);
    });
    names = names.join(',');

    var f4m = arrayIndexOf(names, "Flip4Mac") > -1;
    S.plugins = {
        fla:    arrayIndexOf(names, "Shockwave Flash") > -1,
        qt:     arrayIndexOf(names, "QuickTime") > -1,
        wmp:    !f4m && arrayIndexOf(names, "Windows Media") > -1,
        f4m:    f4m
    };
} else {
    var detectPlugin = function(name) {
        var axo;

        try {
            axo = new ActiveXObject(name);
        } catch(e) {}

        return !!axo;
    }

    S.plugins = {
        fla:    detectPlugin('ShockwaveFlash.ShockwaveFlash'),
        qt:     detectPlugin('QuickTime.QuickTime')
    };
}
