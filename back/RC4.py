from xml.dom import minidom #导入模块
dom=minidom.parse(r"static/scratch.xml") #打开xml
import binascii
cipher1=""

def RC4_get_message():
    ming = dom.getElementsByTagName("mingwen")  # 获取节点列表
    for i in range(len(ming)):
        s = ming[i].firstChild.data  # 打印节点数据
    return s
def get_key():
    key = dom.getElementsByTagName("miyao")  # 获取节点列表
    for i in range(len(key)):
        s = key[i].firstChild.data  # 打印节点数据
    return s


def RC4_get_miwen():
    return cipher1

def init_box(key):
    """
    S盒
    """
    s_box = list(range(256)) #这里没管秘钥小于256的情况，小于256应该不断重复填充即可
    j = 0
    for i in range(256):
        j = (j + s_box[i] + ord(key[i % len(key)])) % 256
        s_box[i], s_box[j] = s_box[j], s_box[i]
    return s_box
def ex_encrypt(plain,box,mode):
    """
    利用PRGA生成秘钥流并与密文字节异或，加解密同一个算法
    """
    if mode == '2':
        plain = plain
    res = []
    i = j =0
    for s in plain:
        i = (i + 1) %256
        j = (j + box[i]) %256
        box[i], box[j] = box[j], box[i]
        t = (box[i] + box[j])% 256
        k = box[t]
        res.append(chr(ord(s)^k))
    cipher = "".join(res)
    if  mode == '1':
        fo=open(r"RC4_miwen.txt","wb+")
        # 化成可视字符需要编码
        print("加密后的输出:")
        print(cipher)
        global cipher1
        cipher1 = cipher
        cipher = cipher.encode()
        fo.seek(0)
        fo.write(cipher)
        fo.seek(0)
        listsss=[fo.read(1) for i in range(100)]
        fo.close()
    if mode == '2':
        # 化成可视字符需要编码
        print("解密后的输出:")
        print(cipher)
def RC4_jiami():
    message = RC4_get_message()
    key = get_key()
    box = init_box(key)
    ex_encrypt(message, box, '1')
def RC4_jiemi():
    message = RC4_get_miwen()
    key = get_key()
    box = init_box(key)
    ex_encrypt(message, box, '2')
def get_mode():
    print("请选择加密或者解密")
    print("1. Encrypt")
    print("2. Decode")
    mode = input()
    if mode == '1':
        RC4_jiami()
    elif mode == '2':
        RC4_jiemi()
    else:
        print("输入有误！")
if __name__ == '__main__':
     while True:
          get_mode()