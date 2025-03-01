console.log('script.js is loaded!');

document.addEventListener('DOMContentLoaded', () => {
    const wafer = document.getElementById('wafer');
    const tooltip = document.getElementById('tooltip');
    const wafer_query = document.querySelector('.wafer');
    const rect = wafer_query.getBoundingClientRect();

    fetch('/api/chip-data') // api 호출로 /api/chip-data 경로로 GET 요청
        .then((response) => response.json())
        .then((chipData) => {
                var max_x = -9999;
                var max_y = -9999;
                var min_x =  9999;
                var min_y =  9999;
            chipData.forEach((chip) => {
               if(chip.x>max_x) max_x = chip.x;
               if(chip.y>max_y) max_y = chip.y;
               if(chip.x<min_x) min_x = chip.x;
               if(chip.y<min_y) min_y = chip.y;
            });
            var wafer_width_conut = max_x - min_x+1;
            var wafer_height_count = max_y - min_y+1;
            console.log(wafer_width_conut, wafer_height_count);
            var chip_border_px= 2;
            var wafermapsize = 500
            chip_width = (wafermapsize - (chip_border_px+1)*wafer_width_conut) / wafer_width_conut;
            chip_hight = (wafermapsize - (chip_border_px+1)*wafer_height_count) / wafer_height_count;

            chipData.forEach((chip) => {
                const chipElement = document.createElement('div');
                chipElement.classList.add('chip');
                chipElement.style.position = 'absolute';
                chipElement.style.backgroundColor = '#747474';
                chipElement.style.width =`${chip_width}px`;
                chipElement.style.height = `${chip_hight}px`;
                chipElement.style.left = `${(chip.x-1)*chip_width+chip_border_px*(chip.x+1)}px`;
                chipElement.style.bottom = `${(chip.y-1)*chip_hight+chip_border_px*(chip.y+1)}px`;

                chipElement.addEventListener('mouseenter', (e) => {
                
                    tooltip.style.display = 'block';
                    tooltip.textContent = `X: ${chip.x}, Y: ${chip.y}`;
                    chipElement.style.backgroundColor = '#4c4c4c';
                    //tooltip.style.left = `${e.offsetX + 10}px`;
                    //tooltip.style.top = `${e.offsetY + 10}px`;
                });

                chipElement.addEventListener('mouseleave', () => {
                    tooltip.style.display = 'none';
                    chipElement.style.backgroundColor = '#747474';
                });

                wafer.appendChild(chipElement);
            });
        })
        .catch((error) => {
            console.error('Error loading chip data:', error);
        });

    wafer.addEventListener('mousemove', (e) => {
        if (tooltip.style.display === 'block') {
            tooltip.style.left = `${e.clientX - rect.left + 10}px`;
            tooltip.style.top = `${e.clientY - rect.top + 10}px`;
        }
    });
});
