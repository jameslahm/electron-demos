const os=require('os')
var chart=null
var lastMessureTimes=[]

function getCpuTimes(cpu){
    return [
        cpu.times.user,
        cpu.times.sys,
        cpu.times.idle
    ]
}

function getDatasets(){
    const datasets=[]
    const cpus=os.cpus()
    for(let i=0;i<cpus.length;i++){
        const cpu=cpus[i]
        const cpuData={
            data:getCpuTimes(cpu),
            backgroundColor:[
                'rgba(255,99,132,1',
                'rgba(54,162,235,1)',
                'rgba(255,206,86,1)'
            ]
        }
        datasets.push(cpuData)
    }
    return datasets
}

function setLastMeasureTimes(cpus){
    for(let i=0;i<cpus.length;i++){
        lastMessureTimes[i]=getCpuTimes(cpus[i])
    }
}

function updateDatasets(){
    const cpus=os.cpus()
    for(let i=0;i<cpus.length;i++){
        const cpu=cpus[i]
        chart.data.datasets[i].data=getCpuTimes(cpu)
        chart.data.datasets[i].data[0]-=lastMeasureTimes[i][0]
        chart.data.datasets[i].data[1]-=lastMeasureTimes[i][1]
        chart.data.datasets[i].data[2]-=lastMeasureTimes[i][2]
    }
    chart.update()
    setLastMeasureTimes(cpus)
}

function drawChart(){
    chart=new chart($('.chart').getContext('2d'),{
        type:'doughnut',
        data:{
            labels:[
                'User Time(ms)',
                'System Time(ms)',
                'Idle Time'
            ],
            datasets:getDatasets()
        },
        options:{
            maintainAspectRatio:false,
            title:{
                display:true,
                text:'CPU Activity',
                fontColor:'rgba(250,250,250)',
                fontSize:16
            },
            legend:{
                display:true,
                labels:{
                    fontColor:'rgba(250,250,250)',
                    fontSize:12
                }
            }
        }
    })
    setInterval(updateDatasets,1000)
}

$(()=>{
    setLastMeasureTimes(os.cpus())
    drawChart()
})