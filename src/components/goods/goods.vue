<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul class="menu">
        <li v-for="(item,index) in goods" class="menu-item" :class="{'current':currentIndex===index}" @click="selectMenu(index)">
          <span class="text border-bottom">
            <icon :size="3" :type="item.type" v-show="item.type>0"></icon>{{ item.name }}
          </span>
        </li>
      </ul>
    </div>
    <div class="goods-wrapper" ref="goodsWrapper">
      <ul>
        <li v-for="item in goods" class="goods-item goods-item-hook">
          <h1 class="title border-left">{{ item.name }}</h1>
          <ul>
            <li v-for="food in item.foods" class="food border-bottom">
              <div class="food-img">
                <img :src="food.icon">
              </div>
              <div class="food-content">
                <h2 class="name">{{food.name}}</h2>
                <p class="description" v-show="food.description !==''">{{food.description}}</p>
                <div class="extra">
                  <span class="sell-count">月售{{food.sellCount}}</span><span class="rating">好评率{{food.rating}}%</span>
                </div>
                <div class="price-wrapper">
                  <span class="price">￥{{food.price}}</span><span class="old-price" v-show="food.oldPrice !==''">￥{{food.oldPrice}}</span>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcar></shopcar>		
  </div>
</template>
<script>
import Icon from "@/components/icon/icon"
import Shopcar from "@/components/shopcar/shopcar"
import BScroll from 'better-scroll'
const ERR_OK = 0
export default {
  data() {
    return {
      goods: [],
      listHeight: [],
      scrollY: 0
    }
  },
  props: {
    seller: {
      type: Object
    }
  },
  components: {
    Icon,
    Shopcar
  },
  created() {
    this.$http.get('api/goods').then((response) => {
      response = response.data
      if (response.errno === ERR_OK) {
        this.goods = response.data
        this.$nextTick(() => {
          this._initScroll()
          this._calculateHeight()
        })

      }
    })
  },
  methods: {
    _initScroll() {
      this.menuScroll = new BScroll(this.$refs.menuWrapper, {
        click: true
      })
      this.goodsScroll = new BScroll(this.$refs.goodsWrapper, {
        probeType: 3
      })
      this.goodsScroll.on('scroll', (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y))
      })
    },
    _calculateHeight() {
      let goodsHeight = this.$refs.goodsWrapper.getElementsByClassName('goods-item-hook')
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < goodsHeight.length; i++) {
        let item = goodsHeight[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }

    },
    selectMenu(index) {
      let goodsHeight = this.$refs.goodsWrapper.getElementsByClassName('goods-item-hook')
      let el = goodsHeight[index]
      this.goodsScroll.scrollToElement(el, 300)
    }
  },
  computed: {
    currentIndex() {
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i]
        let height2 = this.listHeight[i + 1]
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          return i
        }
      }
      return 0
    }
  },
}

</script>
<style scoped lang="scss">
@import "../../assets/scss/public";
@import "../../assets/scss/mixin";

.goods {
  display: flex;
  position: absolute;
  top: 174px;
  bottom: 48px;
  width: 100%;
  overflow: hidden;

  .menu-wrapper {
    flex: 0 0 80px;
    width: 80px;
    background-color: #F3F5F7;

    .menu-item {
      display: table;
      width: 56px;
      height: 54px;
      padding: 0 12px;
      line-height: 14px;
      color: rgb(7, 17, 27);

      .text {
        display: table-cell;
        width: 56px;
        vertical-align: middle;
        font-size: 12px;
        @include border-bottom(rgba(7, 17, 27, .1));
      }

      /* &:last-child {
				.text {
					@include border-none;
				}
			} */
    }

    .current {
      background-color: #fff;

      .text {
        font-weight: 700;
        @include border-none;
      }
    }
  }

  .goods-wrapper {
    flex: 1;

    .title {
      font-size: 12px;
      color: rgb(147, 153, 159);
      font-weight: normal/700;
      line-height: 26px;
      height: 26px;
      padding-left: 14px;
      background: #F3F5F7;
      @include border-left(#d9dde1);
    }

    .food {
      display: flex;
      margin: 18px;
      padding-bottom: 18px;
      @include border-bottom(rgba(7, 17, 27, .1));

      &:last-child {
        @include border-none;
        margin-bottom: 0;
      }

      .food-img {
        flex: 0 0 57px;
        margin-right: 10px;
        vertical-align: top;

        img {
          width: 57px;
          height: 57px;
          border-radius: 2px;
        }
      }

      .food-content {
        flex: 1;

        .name {
          font-size: 14px;
          color: rgb(7, 17, 27);
          line-height: 14px;
          margin: 2px 0 8px 0;
        }

        .description,
        .extra {
          color: rgb(147, 153, 159);
        }

        .description {
          font-size: 10px;
          margin-bottom: 8px;
          line-height: 12px;
        }

        .extra {
          line-height: 10px;

          .sell-count {
            font-size: 10px;
            margin-right: 12px;
          }

          .rating {
            font-size: 10px;
          }
        }

        .price-wrapper {
          line-height: 24px;

          .price {
            font-weight: 700;
            font-size: 14px;
            margin-right: 8px;
            color: rgb(240, 20, 20);
          }

          .old-price {
            font-weight: 700;
            text-decoration: line-through;
            font-size: 10px;
            color: rgb(147, 153, 159);
          }
        }
      }
    }
  }
}

</style>
