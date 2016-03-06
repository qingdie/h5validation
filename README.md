# 遵循h5规范，使用简洁
## 概述

只需简单的按照h5 的属性写法即可实现验证，不需要写再多的js脚本了

## 使用
需要引入 jquery或者zepto
在页面中引入`script/h5validate.js`即可. 例如:

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
                    <td class="title">email：</td>
                    <td>
                        <input type="email" required  />
                    </td>
                </tr>
                <tr>
                    <td class="title">email：</td>
                    <td>
                        <select  name="HouseName" required>
                            <option value="">请选择</option>
                            <option>北京</option>
                            <option>深圳</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td class="title">mobile：</td>
                    <td>
                        <input type="mobile" />
                    </td>
                </tr>
                <tr>
                    <td class="title">number：</td>
                    <td>
                        <input type="number" />
                    </td>
                </tr>
				 <tr>
                    <td class="title">密码：</td>
                    <td><input type="password" id="pass" required /></td>
                </tr>
                <tr>
                    <td class="title">密码确认：</td>
                    <td><input type="password" equalto="#pass" required /></td>
                </tr>
                <tr>
                    <td colspan="2">
                        <input type="submit" onclick="return $.h5validate.validate('#ftype')" value="验证" />
                    </td>
                </tr>
            </table>
```

## 演示
- [qingdie/h5validate](http://blog.qingdie.net/project/h5validation/)

## License
The MIT License(http://opensource.org/licenses/MIT)
请自由地享受和参与开源

## 贡献

如果你有好的意见或建议，欢迎提issue或pull request。