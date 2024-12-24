console.log('script.js is loaded!');

document.addEventListener('DOMContentLoaded', () => {
    const wafer = document.getElementById('wafer');
    const tooltip = document.getElementById('tooltip');

    // API 호출로 칩 데이터를 가져옴
    fetch('/api/chip-data')
        .then((response) => response.json())
        .then((chipData) => {
            console.log('script.js is loaded!2');
            chipData.forEach((chip) => {
                const chipElement = document.createElement('div');
                chipElement.classList.add('chip');
                chipElement.style.left = `${chip.x}px`;
                chipElement.style.top = `${chip.y}px`;

                chipElement.addEventListener('mouseenter', (e) => {
                    tooltip.style.display = 'block';
                    tooltip.textContent = `X: ${chip.x}, Y: ${chip.y}`;
                    tooltip.style.left = `${e.pageX + 10}px`;
                    tooltip.style.top = `${e.pageY + 10}px`;
                });

                chipElement.addEventListener('mouseleave', () => {
                    tooltip.style.display = 'none';
                });

                wafer.appendChild(chipElement);
            });
        })
        .catch((error) => {
            console.error('Error loading chip data:', error);
        });

    wafer.addEventListener('mousemove', (e) => {
        if (tooltip.style.display === 'block') {
            tooltip.style.left = `${e.pageX + 10}px`;
            tooltip.style.top = `${e.pageY + 10}px`;
        }
    });
});
