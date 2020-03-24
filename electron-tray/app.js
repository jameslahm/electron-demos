const {app,BrowserWindow,Tray}=require('electron')
const path=require('path')

let window=null
let tray=null

app.once('ready',()=>{
    tray=new Tray(path.join('assets','electron-icon.png'))
    tray.on('right-click',toggleWindow)
    tray.on('double-click',toggleWindow)
    tray.on('click',function(event){
        toggleWindow()
    })

    window=new BrowserWindow({
        width:300,
        height:450,
        show:false,
        frame:true,
        fullscreenable:false,
        webPreferences:{
            nodeIntegration:true,
            enableRemoteModule:true,
        }
    })

    const url="https://electronjs.org"
    window.loadURL(url)

    window.once('ready-to-show',()=>{
        const position=getWindowPosition()
        window.setPosition(position.x,position.y,false)
        window.show()
        window.focus()
    })

    window.on('blur',()=>{
        window.hide()
    })
})

const getWindowPosition=()=>{
    const windowBounds=window.getBounds()
    const trayBounds=tray.getBounds()

    return {x:windowBounds.x,y:windowBounds.y}
}

const toggleWindow=()=>{
    if(window.isVisible()){
        window.hide()
    }
    else{
        showWindow()
    }
}

const showWindow=()=>{
    const position=getWindowPosition()
    window.setPosition(position.x,position.y,false)
    window.show()
    window.focus()
}