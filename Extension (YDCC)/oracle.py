from flask import Flask, render_template, request
import requests

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('oracle.html')

@app.route('/check', methods=['POST'])
def check():
    url = request.form['url']
    result = check_website(url)
    return result

def check_website(url):
    # Đây là nơi bạn sẽ thực hiện kiểm tra tính an toàn của trang web.
    # Trong ví dụ này, chúng ta sẽ chỉ trả về một giá trị ngẫu nhiên để minh họa.
    if url == "example.com":
        return "safe"
    else:
        return "unsafe"

if __name__ == '__main__':
    app.run(debug=True)
