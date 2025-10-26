document.addEventListener('DOMContentLoaded', ()=>{

    // Bar chart
    const barCtx = document.getElementById('barChartSmall');
    if(barCtx){
      new Chart(barCtx,{ type:'bar', data:{
        labels:['ISOCEL','Lã Mineral','Poliestireno Expandido'],
        datasets:[{ data:[0.035,0.045,0.033], borderRadius:6 }]
      }, options:{
        responsive:true, maintainAspectRatio:false,
        plugins:{legend:{display:false}}, scales:{ y:{ beginAtZero:true, max:0.06, ticks:{ color:'#cbdcff' }}, x:{ ticks:{color:'#fff'}}}
      }});
    }
  
    // Pie
    const pieCtx = document.getElementById('pieChartSmall');
    if(pieCtx){
      new Chart(pieCtx,{ type:'pie', data:{
        labels:['Solar','Eólica','Biogás'],
        datasets:[{ data:[55,25,20] }]
      }, options:{ responsive:true, plugins:{legend:{position:'bottom'}} }});
    }
  
    // Line
    const lineCtx = document.getElementById('lineChartSmall');
    if(lineCtx){
      new Chart(lineCtx,{ type:'line', data:{
        labels:['0h','3h','6h','9h','12h','15h','18h','21h'],
        datasets:[{ label:'Temperatura (°C)', data:[22.2,21.9,21.5,21.2,21.0,21.1,21.3,21.2], tension:0.28, pointRadius:3, borderWidth:2 }]
      }, options:{ responsive:true, maintainAspectRatio:false, plugins:{legend:{display:false}}, scales:{ y:{ min:18, max:24, ticks:{color:'#cbdcff'}}}}});
    }
  
  });
  