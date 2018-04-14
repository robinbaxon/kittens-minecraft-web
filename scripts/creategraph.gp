# gnuplot script file for plotting memory usage over time
#!/usr/bin/gnuplot
reset

set terminal unknown


set xdata time
set timefmt "%s"
set format x "%H:%M:%S"

plot "/home/minecraft/memorylogs/memorylog.dat" using 1:2 title "Minnebruk"
set xlabel "Tid/dato"
set ylabel "Minnebruk"

set ytics 200
#set xtics 1000

xspan = GPVAL_DATA_X_MAX - GPVAL_DATA_X_MIN
yspan = GPVAL_DATA_Y_MAX - GPVAL_DATA_Y_MIN

xequiv = 60
yequiv = 100
ar = yspan/xspan * xequiv/yequiv

ydim = 1080 
xdim = 200/ar

set xrange [GPVAL_DATA_X_MIN:GPVAL_DATA_X_MAX+200]
set yrange [GPVAL_DATA_Y_MIN:GPVAL_DATA_Y_MAX]

set terminal png size xdim,ydim
set size ratio ar
set style data linespoints

set title "Minnebruk over tid"
set key below
set grid

plot "/home/minecraft/memorylogs/memorylog.dat" using 1:2 title "Minnebruk"
