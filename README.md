# ��ѭh5�淶��ʹ�ü��
## ����

ֻ��򵥵İ���h5 ������д������ʵ����֤������Ҫд�ٶ��js�ű���

## ʹ��
��Ҫ���� jquery����zepto
��ҳ��������`script/h5validate.js`����. ����:

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=0">
        <title>h5validate</title>
        <script src="script/zepto.js"></script>
        <script src="script/h5validate.js"></script>
    </head>
    <body>
    
    </body>
</html>
```

```html
   <table style="width: 100%;">
                <tr>
                    <td class="title">email��</td>
                    <td>
                        <input type="email" required  />
                    </td>
                </tr>
                <tr>
                    <td class="title">email��</td>
                    <td>
                        <select  name="HouseName" required>
                            <option value="">��ѡ��</option>
                            <option>����</option>
                            <option>����</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td class="title">mobile��</td>
                    <td>
                        <input type="mobile" />
                    </td>
                </tr>
                <tr>
                    <td class="title">number��</td>
                    <td>
                        <input type="number" />
                    </td>
                </tr>
				 <tr>
                    <td class="title">���룺</td>
                    <td><input type="password" id="pass" required /></td>
                </tr>
                <tr>
                    <td class="title">����ȷ�ϣ�</td>
                    <td><input type="password" equalto="#pass" required /></td>
                </tr>
                <tr>
                    <td colspan="2">
                        <input type="submit" onclick="return $.h5validate.validate('#ftype')" value="��֤" />
                    </td>
                </tr>
            </table>
```

## ��ʾ
- [qingdie/h5validate](http://blog.qingdie.net/project/h5validation/)

## License
The MIT License(http://opensource.org/licenses/MIT)
�����ɵ����ܺͲ��뿪Դ

## ����

������кõ�������飬��ӭ��issue��pull request��