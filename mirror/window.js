$(()=>{
    const {remote}=require('electron')

    const {screen}=remote

    const display=screen.getPrimaryDisplay()

    const constraints={
        video:{
            width:{
                ideal:display.size.width
            },
            height:{
                ideal:display.size.height
            }
        }
    }

    navigator.mediaDevices.getUserMedia(constraints).then((stream)=>{
        const video=document.querySelector('video')
        video.srcObject=stream
    }).catch((error)=>{
        console.error(error)
    })

    $("#rainbow-toggle").on('change',()=>{
        if($('#rainbow-toggle').is(':checked')){
            $('.rainbow-filter').show()
        }
        else{
            $('.rainbow-filter').hide()
        }
    })
})