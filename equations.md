## Calculation of the EEM risk factor

The EMM is 

![F_{demographic} = Norm\left (\left(1 + 5*F_{urban} \right) \cdot \left(1 + 2*F_{wet-markets} \right) \cdot \sqrt{\dfrac{F_{pop-density}}{F_{GDP}}}  \right )](https://render.githubusercontent.com/render/math?math=F_%7Bdemographic%7D%20%3D%20Norm%5Cleft%20(%5Cleft(1%20%2B%205*F_%7Burban%7D%20%5Cright)%20%5Ccdot%20%5Cleft(1%20%2B%202*F_%7Bwet-markets%7D%20%5Cright)%20%5Ccdot%20%5Csqrt%7B%5Cdfrac%7BF_%7Bpop-density%7D%7D%7BF_%7BGDP%7D%7D%7D%20%20%5Cright%20))

![X_{1} = Norm \left( F_{deforestation} \cdot F_{mammals} \cdot F_{demographic}  \right )                     ](https://render.githubusercontent.com/render/math?math=X_%7B1%7D%20%3D%20Norm%20%5Cleft(%20F_%7Bdeforestation%7D%20%5Ccdot%20F_%7Bmammals%7D%20%5Ccdot%20F_%7Bdemographic%7D%20%20%5Cright%20)%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20)

![X_{2} = Norm \left( F_{treecover} \cdot \left (F_{pastures} + F_{crops}  \right )  \right )                     ](https://render.githubusercontent.com/render/math?math=X_%7B2%7D%20%3D%20Norm%20%5Cleft(%20F_%7Btreecover%7D%20%5Ccdot%20%5Cleft%20(F_%7Bpastures%7D%20%2B%20F_%7Bcrops%7D%20%20%5Cright%20)%20%20%5Cright%20)%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20)

![X_{3} = Norm \left( F_{mammals} \cdot F_{pastures} \cdot F_{demographic}  \right )                     ](https://render.githubusercontent.com/render/math?math=X_%7B3%7D%20%3D%20Norm%20%5Cleft(%20F_%7Bmammals%7D%20%5Ccdot%20F_%7Bpastures%7D%20%5Ccdot%20F_%7Bdemographic%7D%20%20%5Cright%20)%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20)

![X_{4} = Norm \left( \left (F_{fires} + F_{floods}  \right ) \cdot F_{demographic}  \right )                     ](https://render.githubusercontent.com/render/math?math=X_%7B4%7D%20%3D%20Norm%20%5Cleft(%20%5Cleft%20(F_%7Bfires%7D%20%2B%20F_%7Bfloods%7D%20%20%5Cright%20)%20%5Ccdot%20F_%7Bdemographic%7D%20%20%5Cright%20)%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20)

![Z = Norm \left ( \left (X_1 + X_2 + X_3 + X_4  \right ) * F_{pop-density}\right )](https://render.githubusercontent.com/render/math?math=Z%20%3D%20Norm%20%5Cleft%20(%20%5Cleft%20(X_1%20%2B%20X_2%20%2B%20X_3%20%2B%20X_4%20%20%5Cright%20)%20*%20F_%7Bpop-density%7D%5Cright%20))


