const {app,BrowserWindow}=require('electron')
const path=require('path')
const url=require('url')

let window=null

app.once('ready',()=>{
    window=new BrowserWindow({
        with:400,
        height:500,
        show:false,
        webPreferences:{
            nodeIntegration:true,
        }
    })

    window.loadURL(url.format({
        pathname:path.join(__dirname,'index.html'),
        protocol:'file',
        slashes:true
    }))

    window.once('ready-to-show',()=>{
        window.show()
    })
})