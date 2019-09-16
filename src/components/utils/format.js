    //工具对象
    const _= {
        //把_对象名让出去，同时返回自身
        noConflict() {
            window._ = null
            return this
        },
        /**
         * 扩展方法
         */
        extend(proto, options) {
            for (const key in options) {
                if (!proto[key]) proto[key] = options[key]
            }
        }
    }

    _.extend(_, {
        loadingbar: {
            config: {
                color: "blue"
            },
            start() {
                var loadingbar = document.getElementById("loadingbar")
                if (!loadingbar) {
                    loadingbar = document.createElement("div")
                    loadingbar.setAttribute("id", 'loadingbar')
                    loadingbar.style.backgroundColor = this.config.color
                    document.body.appendChild(loadingbar)
                }
                loadingbar.style.display = "block"
            },
            finish() {
                var loadingbar = document.getElementById("loadingbar")
                if (loadingbar) loadingbar.style.display = "none"
            }
        },
        formatMs2Obj(total) {
            var h = _.repairZero(Math.floor(total / 3600))
            var m = _.repairZero(Math.floor((total - h * 3600) / 60))
            var s = _.repairZero(Math.floor(total - h * 3600 - m * 60))
            //ES6 结构  h:h
            return {
                h,
                m,
                s
            }
        },
        convertMysqlTime2JSTime(val) {
            return new Date(new Date(val).toISOString().replace("T", ' ').split('.')[0])
        },
        getQueryParams() {
            if (!location.search) return null
            var query = location.search.replace("?", '')
            return this.splitStr2Obj(query)
        },
        splitStr2Obj(str) {
            var obj = {}
            if (!str) return obj
            var queryarr = str.split("&")
            queryarr.forEach(r => {
                var temparr = r.split('=')
                obj[temparr[0]] = temparr[1]
            })
            return obj
        },
        log() {
            //将数组通过某字符变成字符串
            console.log(Array.prototype.join.call(arguments, ' '))
        },
        /**
         * 补零
         */
        repairZero(num) {
            return num < 10 ? ("0" + num) : num
        },
        /**
         * 合并字符串
         */
        makeStr(...args) {
            return args.join('')
        },
        /**
         * 加载script
         */
        loadScript(url, callback) {
            const head = doc.getElementsByTagName("head")[0]
            var script = doc.createElement("script")
            script.src = this.makeStr(url, "?", this.random())
            script.charset = "utf-8"
            script.async = true
            if (callback) script.onload = callback
            head.appendChild(script)
        },
        isArray(obj) {
            if (Array.isArray) return Array.isArray(obj)
            return this.toString(obj) === '[object Array]'
        },
        isFuction(obj) {
            return this.toString(obj) === '[object Function]'
        },
        toString(obj) {
            return Object.prototype.toString.call(obj)
        },
        // 获取最终位置，防止出画面
        calcPostion(left, top, maxLeft, maxTop, minLeft = 0, minTop = 0) {
            if (left < minLeft) left = minLeft
            else if (left > maxLeft) left = maxLeft
            if (top < minTop) top = minTop
            else if (top > maxTop) top = maxTop
            return {
                left,
                top
            }
        }
    })


    const doc = document
    /**
     * 字符串扩展
     */
    _.extend(String.prototype, {
        /**
         * 判断相等
         */
        equals(str) {
            return this === str
        },
        /**
         * 判断是否包含某字符串
         */
        includes(str) {
            return this.indexOf(str) > -1
        },
        /**
         * 判断是否以某字符串做开头
         */
        startsWith(str) {
            return this.indexOf(str) === 0
        },
        /**
         * 转数字
         */
        toNumber() {
            var result = parseFloat(this)
            return isNaN(result) ? 0 : result
        },
        /**
         * 首字母大写
         */
        toCapitalized() {
            return this[0].toUpperCase() + this.substring(1)
        },
        /**
         * 马赛克  张*丰
         */
        mosaic(start, end, code = "*") {
            if (!start && start !== 0) throw new Error("参数有误")
            if (isNaN(start) || start < 0 || start >= this.length)
                throw new Error("参数有误")
            if (!end || end >= this.length) end = this.length
            if (isNaN(end) || end <= start) throw new Error("参数有误")

            var left = this.substring(0, start)
            var middle = code.repeat(end - start)
            var end = this.substring(end)
            return left + middle + end
        },
        /**
         * 字符串溢出省略
         */
        limit(count = 50) {
            if (this.length <= count) return this
            return this.substring(0, count) + "..."
        }
    })

    /**
     * 时间扩展
     */
    _.extend(Date.prototype, {


        /**
         * 获取格式化时间文本
         */
        getFormatText() {
            var now = this
            var yyyy = now.getFullYear()
            var mm = _.repairZero(now.getMonth() + 1)
            var dd = _.repairZero(now.getDate())
            var hh = _.repairZero(now.getHours())
            var mi = _.repairZero(now.getMinutes())
            var ss = _.repairZero(now.getSeconds())
            var str = "日一二三四五六"
            var week = str[now.getDay()]
            return `${yyyy}-${mm}-${dd} ${hh}:${mi}:${ss} 周${week}`
        },
        /**
         * 获取年月日文本
         */
        getFormatDate() {
            return this.getFormatText().split(' ')[0]
        },
        /**
         * 获取时分秒文本
         */
        getFormatTime() {
            return this.getFormatText().split(' ')[1]
        },
        /**
         * 获取星期几文本
         */
        getFormatWeek() {
            return this.getFormatText().split(' ')[2]
        }
    })

    /**
     * 数组扩展
     */
    _.extend(Array.prototype, {
        /**
         * 元素在数组中第一次出现位置
         */
        indexOf(obj) {
            for (let i = 0; i < this.length; i++) {
                if (this[i] === obj) return i
            }
            return -1
        },
        /**
         * 元素在数组中最后出现位置
         */
        lastIndexOf(obj) {
            for (let i = this.length - 1; i >= 0; i--) {
                if (this[i] === obj) return i
            }
            return -1
        },
        /**
         * 向数组末尾添加元素
         */
        push(obj) {
            this[this.length] = obj
        },
        //数组拼接成字符串
        join(code = "") {
            var str = ""
            for (let i = 0; i < this.length; i++) {
                str += (this[i] + code)
            }
            return str.substring(0, str.length - 1)
        },
        /*
         * 删除一个元素
         */
        remove(obj) {
            var index = this.indexOf(obj)
            if (index > -1) this.removeAt(index)
        },
        /**
         * 根据下标删除一个元素
         */
        removeAt(index) {
            if (index >= 0 && index < this.length) {
                this.splice(index, 1)
            }
        },
        /**
         * 删除元素
         */
        removeAll(obj) {
            //找元素在数组中的位置
            var index = this.indexOf(obj)
            //如果找到了
            if (index > -1) {
                //从数组中根据下标删掉
                this.removeAt(index)
                //再次调用自身,直到数组中找不到此元素为止
                arguments.callee.call(this, obj)
            }
        },
        /**
         * 根据下标删除一段元素
         */
        splice(index, count) {
            for (let i = index; i < this.length - 1; i++) {
                this[i] = this[i + count]
            }
            for (let i = 0; i < count; i++) this.pop()
        },
        /**
         * 删除第一个元素
         */
        shift() {
            var result = this[0]
            this.splice(0, 1)
            return result
        },
        /**
         * 数组翻转
         */
        reverse() {
            for (let i = 0; i < Math.floor(this.length / 2); i++) {
                var temp = this[i]
                this[i] = this[this.length - 1 - i]
                this[this.length - 1 - i] = temp
            }
        },

        /**
         * 在指定位置添加元素
         */
        insertAt(index, obj) {
            if (index < 0 || index > this.length) throw new Error("参数有误")
            for (let i = this.length - 1; i >= index; i--) {
                this[i + 1] = this[i]
            }
            this[index] = obj
            return this.length
        },
        /**
         * 往开头添加元素
         */
        unshift(obj) {
            return this.insertAt(0, obj)
        },
        /**
         * 删除最后一个元素
         */
        pop() {
            var result = this[this.length - 1]
            this.length -= 1
            return result
        },
        forEach(fn) {
            for (let i = 0; i < this.length; i++) {
                fn(this[i], i)
            }
        },
        some(fn) {
            for (let i = 0; i < this.length; i++) {
                if (fn(this[i], i)) return true
            }
            return false
        },
        every(fn) {
            for (let i = 0; i < this.length; i++) {
                if (!fn(this[i], i)) return false
            }
            return true
        },
        count(fn) {
            var result = 0
            this.forEach(function (item, i) {
                if (fn(item, i)) result++
            })
            return result
        },
        filter(fn) {
            var result = []
            this.forEach(function (item, i) {
                if (fn(item, i)) result.push(item)
            })
            return result
        },
        map(callback) {
            var arr = []
            for (let i = 0; i < this.length; i++) {
                var result = callback(this[i], i)
                arr.push(result)
            }
            return arr
        },
        includes(obj) {
            return this.some(function (item, i) {
                return item === obj
            })
        }
    })

    //Math 扩展
    _.extend(Math, {
        /**
         * 判断是否是奇数
         */
        isOdd(num) {
            return num % 2 !== 0
        },

        /**
         * 判断是否是偶数
         */
        isEven(num) {
            return num % 2 === 0
        },

        /**
         * 随机整数(max,min)
         */
        rnd(max, min = 0) {
            return Math.round(Math.random() * (max - min)) + min
        }
    })
export default _
