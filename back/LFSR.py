from xml.dom import minidom #导入模块
dom=minidom.parse(r"static/scratch.xml") #打开xml

#写入文件
def f_write(filename,message):
        f = open(filename,'w')
        f.write(message)
        f.close()
        return 0
def LFSR_get_message():
    ming = dom.getElementsByTagName("mingwen")  # 获取节点列表
    s = ming[0].firstChild.data  # 打印节点数据
    return s
def LFSR_get_miwen():
    fo = open("LFSR-miwen.txt","r",encoding='UTF-8')
    mi = fo.read()
    mi=str(mi)
    fo.close()
    return mi
def LFSR_get_mingwen():
    fo = open("LFSR-mingwen.txt","r",encoding='UTF-8')
    m = fo.read()
    m=str(m)
    fo.close()
    return m
def get_key1():
    k1 = dom.getElementsByTagName("LFSR-key1")  # 获取节点列表
    s = k1[0].firstChild.data  # 打印节点数据
    return s
def get_key2():
    k2 = dom.getElementsByTagName("LFSR-key2")  # 获取节点列表
    s = k2[0].firstChild.data  # 打印节点数据
    return s
def get_s1():
    s1 = dom.getElementsByTagName("LFSR-s1")  # 获取节点列表
    s = s1[0].firstChild.data  # 打印节点数据
    return s
def get_s2():
    s2 = dom.getElementsByTagName("LFSR-s1")  # 获取节点列表
    s = s2[0].firstChild.data  # 打印节点数据
    return s


def LFSR1():
    KEY1 = 0
    for i in range(9, 0, -1): # LFSR1输出
        KEY1 = ( key1[i] * state1[i] + KEY1) % 2
        if i > 0:
            state1[i] = state1[i - 1]
            state1[i] = KEY1
    return KEY1;
def LFSR2():
    KEY2 = 0
    for i in range(9, 0, -1): # LFSR2输出
        KEY2 = ( key2[i] * state2[i] + KEY2) % 2
        if i > 0:
            state2[i] = state2[i - 1]
            state2[i] = KEY2
    return KEY2

tmp = 0
def JK(tmp):  # JK触发器
    KEY = tmp
    KEY1 = LFSR1()
    KEY2 = LFSR2()
    if KEY1 == 0 and KEY2 == 1:
        KEY = 0
    elif KEY1 == 1 and KEY2 == 0:
        KEY = 1
    elif KEY1 == 1 and KEY2 == 1:
        KEY = (KEY + 1) % 2
    tmp = KEY
    return KEY
def load_key():
    tmp=0
    keystr1 = get_key1()
    keystr2 = get_key2()
    sstr1 = get_s1()
    sstr2 = get_s2()
    for i in range(10):
        key1[i] = int(keystr1[i])
        key2[i] = int(keystr2[i])
        state1[i] = int(sstr1[i])
        state2[i] = int(sstr2[i])

def encode(s):
    return ' '.join([bin(ord(c)).replace('0b', '') for c in s])
def decode(s):
    return ''.join([chr(i) for i in [int(b, 2) for b in s.split(' ')]])

def LFSR_jiami():
    load_key()
    miwendata=""
    for i in range(obvdata.__len__()):
        if obvdata[i] == ' ':
            miwendata += ' '
            continue
        elif obvdata[i-1] == ' ' or i == 0:
            miwendata +='1'
            continue
        obvtext[i] = int(obvdata[i])
        miwentext[i] = (obvtext[i] + JK(tmp)) % 2
        miwendata += str(miwentext[i])
    miwenstr = decode(miwendata)
    f_write('LFSR-miwen.txt', miwenstr)

def LFSR_jiemi():
    load_key()
    mingwendata=""
    secstr = LFSR_get_miwen()
    secdata = encode(secstr)
    for i in range(secdata.__len__()):
        if secdata[i] == ' ':
            mingwendata += " "
            continue
        elif secdata[i-1] == ' ' or i == 0:
            mingwendata += '1'
            continue
        sectext[i] = int(secdata[i])
        sectext[i] = (sectext[i] + JK(tmp)) % 2
        mingwendata += str(sectext[i])
    mingwenstr = decode(mingwendata)
    print("解密后明文：",mingwenstr)
    f_write("LFSR-mingwen.txt", mingwenstr)

obvstr = LFSR_get_message()
#print("明文",obvstr)
global miwendata
obvdata = encode(obvstr)
a = decode(obvdata)
obvtext=[0 for i in range(obvdata.__len__())]
miwentext=obvtext
sectext=miwentext

key1=[0 for i in range(10)]
key2=key1
state1=key1
state2=key1

def get_mode():
    print("请选择加密或者解密")
    print("1. Encrypt")
    print("2. Decode")
    mode = input()
    if mode == '1':
        LFSR_jiami()
        print("加密成功")
        print(LFSR_get_miwen())
    elif mode == '2':
        LFSR_jiemi()
    else:
        print("输入有误！")
if __name__ == '__main__':
    while(1):
        get_mode()