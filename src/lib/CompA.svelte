<script>
    let x = 1;
    let y = 1;
    let z = 1;

    let sigma = 10;
    let rho = 28;
    let beta = 8 / 3;

    let dt = 0.005;

    var dx;

    var dy;

    var dz;


    setInterval(() => {
        dx = sigma * (y - x) * dt;

        dy = (x * (rho - z) - y) * dt;

        dz = (x * y - beta * z) * dt;
        x += dx;
        y += dy;
        z += dz;
    }, 1);
</script>

<div style="width:200px; height:200px;">
    <div
        style="bottom:{0 + y * 2}px; left:{150 +
            x * 2}px; width:10px; height:10px; 
            border-radius:50%;
            background-color:black; position: relative;"
    />

    <!-- <h1>Project1 look how cool i am</h1> -->
</div>
