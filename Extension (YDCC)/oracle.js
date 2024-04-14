document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('checkButton').addEventListener('click', function() {
        var url = document.getElementById('urlInput').value;
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://127.0.0.1:5500/popup.html', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    document.getElementById('result').innerText = 'Website is ' + xhr.responseText;
                } else {
                    document.getElementById('result').innerText = 'Safe ' + xhr.responseText;
                }
            }
        };
        xhr.send('url=' + encodeURIComponent(url));
    });
});
// Xử lý sự kiện click cho nút "Check"
document.getElementById('checkButton').addEventListener('click', function() {
    var url = document.getElementById('urlInput').value;
    // Gọi hàm kiểm tra tính an toàn của liên kết và hiển thị kết quả
    isSafe(url);
});


document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('checkButton').addEventListener('click', function() {
        var url = document.getElementById('urlInput').value;
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://127.0.0.1:5500/popup.html', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    document.getElementById('result').innerText = 'Website is ' + xhr.responseText;
                } else {
                    document.getElementById('result').innerText = 'Safe ' + xhr.responseText;
                }
            }
        };
        xhr.send('url=' + encodeURIComponent(url));
    });
});
// Xử lý sự kiện click cho nút "Check"
document.getElementById('checkButton').addEventListener('click', function() {
    var url = document.getElementById('urlInput').value;
    // Gọi hàm kiểm tra tính an toàn của liên kết và hiển thị kết quả
    this.style.display = 'none';
    isSafe(url);
});


document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('checkButton').addEventListener('click', function() {
        var url = document.getElementById('urlInput').value;
        // Gọi hàm kiểm tra tính an toàn của liên kết và hiển thị kết quả
        isSafe(url);
    });
});

// Hàm để lấy tên miền từ một URL
function getDomain(url) {
    var domain;
    // Tìm và lấy tên miền từ URL
    if (url.indexOf("://") > -1) {
        domain = url.split('/')[2];
    } else {
        domain = url.split('/')[0];
    }
    // Loại bỏ www nếu có
    domain = domain.replace('www.', '');
    return domain;
}

// Hàm kiểm tra xem một liên kết có thuộc danh sách miền không an toàn không
function isUnsafeDomain(link) {
    var unsafeDomains = {
        "telluridemushroomfest.org": true,
        "phimmoiiii.net": true,
        "al-masdaronline.net": true,
        "top10invn.net": true,
        "77bet22.com": true
    };

    var domain = getDomain(link);
    return unsafeDomains[domain] || false;
}

function isSafe(link) {
    // Gọi API của Google Safe Browsing để kiểm tra tính an toàn của liên kết
    var apiKey = 'AIzaSyAsZKe9RzXlKB9yWB5pQeCmmHVWmGxKzXk'; // API_KEY
    var url = 'https://safebrowsing.googleapis.com/v4/threatMatches:find?key=' + apiKey;
    var requestBody = {
        "client": {
            "clientId": "your-client-id",
            "clientVersion": "1.0"
        },
        "threatInfo": {
            "threatTypes": ["MALWARE", "SOCIAL_ENGINEERING", "UNWANTED_SOFTWARE"],
            "platformTypes": ["ANY_PLATFORM"],
            "threatEntryTypes": ["URL"],
            "threatEntries": [{"url": link}]
        }
    };

    fetch(url, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        // Kiểm tra kết quả trả về từ API
        if (data.matches && data.matches.length > 0) {
            // Liên kết không an toàn, hiển thị thông báo cảnh báo
            document.getElementById('result').innerText = 'Website is unsafe!';
            // Liên kết không an toàn, hiển thị thông báo cảnh báo và thêm nút "Report"
            var reportButton = createReportButton();
            document.getElementById('result').innerText = 'Website is unsafe!';
            document.getElementById('result').appendChild(reportButton);
        } else {
            // Kiểm tra xem liên kết có thuộc danh sách miền không an toàn không
            if (isUnsafeDomain(link)) {
                // Nếu thuộc danh sách miền không an toàn, hiển thị thông báo cảnh báo
                document.getElementById('result').innerText = 'Website is unsafe!';
                // Liên kết không an toàn, hiển thị thông báo cảnh báo và thêm nút "Report"
                var reportButton = createReportButton();
                document.getElementById('result').innerText = 'Website is unsafe!';
                document.getElementById('result').appendChild(reportButton);
            } else {
                // Nếu không thuộc danh sách miền không an toàn, hiển thị thông báo an toàn
                document.getElementById('result').innerText = 'Website is safe!';
            }
        }
    })
    .catch(error => {
        console.error('Error:', error);
        // Xử lý lỗi (nếu cần)
    });
}
function createReportButton() {
    var reportButton = document.createElement('button');
    reportButton.innerText = 'Report';
    reportButton.style.marginLeft = '10px'; // Khoảng cách giữa nút "Check" và nút "Report"
    reportButton.addEventListener('click', function() {
        // Chuyển hướng đến đường dẫn để báo cáo
        window.open('https://safebrowsing.google.com/safebrowsing/report_phish/?hl=en', '_blank'); // Thay YOUR_REPORT_URL_HERE bằng đường dẫn của bạn
    });
    return reportButton;
}
