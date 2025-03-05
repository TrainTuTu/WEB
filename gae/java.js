// Xử lý kéo thả quân cờ
let draggedCell = null; // Ô đang kéo
let originalContent = ''; // Nội dung ban đầu của ô kéo
let originalClass = ''; // Class ban đầu của ô kéo

document.querySelectorAll('.chess-board td').forEach(cell => {
    // Đặt draggable cho tất cả ô có quân cờ ban đầu
    if (cell.textContent.trim()) {
        cell.setAttribute('draggable', true);
    }

    cell.addEventListener('dragstart', function(e) {
        if (e.target.textContent.trim()) { // Chỉ kéo ô có quân cờ
            draggedCell = e.target;
            originalContent = e.target.textContent;
            originalClass = e.target.className; // Lưu class ban đầu
            e.dataTransfer.setData('text/plain', e.target.textContent);
            e.target.classList.add('dragging');
            setTimeout(() => {
                e.target.textContent = ''; // Ẩn quân cờ khi kéo
            }, 0);
        } else {
            e.preventDefault(); // Ngăn kéo ô trống
        }
    });

    cell.addEventListener('dragend', function(e) {
        if (draggedCell) {
            // Nếu không thả vào ô hợp lệ, khôi phục nội dung và class cũ
            if (!e.dataTransfer.dropEffect || e.dataTransfer.dropEffect === 'none') {
                draggedCell.textContent = originalContent;
                draggedCell.className = originalClass; // Khôi phục class
            }
            draggedCell.classList.remove('dragging');
            draggedCell = null;
            originalContent = '';
            originalClass = '';
        }
    });

    cell.addEventListener('dragover', function(e) {
        e.preventDefault(); // Cho phép thả vào mọi ô
    });

    cell.addEventListener('drop', function(e) {
        e.preventDefault();
        if (draggedCell) {
            const piece = e.dataTransfer.getData('text/plain');
            const targetClass = e.target.className; // Lưu class của ô đích
            const targetContent = e.target.textContent; // Lưu nội dung cũ của ô đích

            // Thả quân cờ vào ô đích, giữ nguyên class của ô đích
            e.target.textContent = piece;
            e.target.setAttribute('draggable', true);

            // Cập nhật ô nguồn, giữ nguyên class của ô nguồn
            if (draggedCell !== e.target) {
                draggedCell.textContent = targetContent;
                draggedCell.className = originalClass; // Giữ class của ô nguồn
                if (draggedCell.textContent.trim()) {
                    draggedCell.setAttribute('draggable', true);
                } else {
                    draggedCell.removeAttribute('draggable');
                }
            }
            // Đảm bảo ô đích giữ class ban đầu
            e.target.className = targetClass;
            draggedCell = null;
        }
    });

    // Cập nhật draggable khi nội dung ô thay đổi
    cell.addEventListener('DOMSubtreeModified', function(e) {
        if (e.target.textContent.trim()) {
            e.target.setAttribute('draggable', true);
        } else {
            e.target.removeAttribute('draggable');
        }
    });
});