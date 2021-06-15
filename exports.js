const translate = require('@iamtraction/google-translate');
const Enmap = require("enmap");
const cEnmap = new Enmap({ name: "config" });

module.exports = {
    configEnmap : cEnmap,
    translationFunc : async function(id,t) {
        var langCode = cEnmap.get("language_"+id);
        if (langCode == undefined) {
            langCode = "en";
        }

        if (langCode == "en") {
            return t;
        }
        
        const options = {
            to: langCode
        }

        const result = await translate(t, options)
        return result.text;
    }
}