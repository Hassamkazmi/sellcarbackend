const DataUrlParse = require("datauri/parser.js")
const path = require("path")
exports.Dataurl= (file)=>{
    const parser=  new DataUrlParse();
    const extname = path.extname(file.originalname.toString())
    return parser.format(extname,file.buffer);
}