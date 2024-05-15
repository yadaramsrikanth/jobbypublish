// Write your code here
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import {BsPlusSquare} from 'react-icons/bs'
import {BsDashSquare} from 'react-icons/bs'

import {Component} from 'react'
import SimilarProductItem from '../SimilarProductItem'

import Header from '../Header'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class ProductItemDetails extends Component {
  state = {
    itemDetails: {},
    apiStatus: apiStatusConstants.initial,
    itemsCount: 1,
  }

  componentDidMount() {
    this.getProductDetails()
  }

  getFormattedData = product => ({
    title: product.title,
    brand: product.brand,
    price: product.price,
    rating: product.rating,
    imageUrl: product.image_url,
    id: product.id,
  })

  getProductDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')

    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/products/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)

    if (response.ok) {
      const data = await response.json()
      console.log(data)

      const updatedData = {
        availability: data.availability,
        brand: data.brand,
        description: data.description,
        price: data.price,
        imageUrl: data.image_url,
        title: data.title,
        totalReviews: data.total_reviews,
        rating: data.rating,
        similarProducts: data.similar_products.map(eachSimilarProduct =>
          this.getFormattedData(eachSimilarProduct),
        ),
      }
      this.setState({
        itemDetails: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  increaseCount = () => {
    this.setState(prevState => ({itemsCount: prevState.itemsCount + 1}))
  }

  decreaseCount = () => {
    const {itemsCount} = this.state
    if (itemsCount > 1) {
      this.setState(prevState => ({itemsCount: prevState.itemsCount - 1}))
    } else {
      this.setState({itemsCount: 1})
    }
  }

  renderProductDetailsViews = () => {
    const {itemDetails, itemsCount} = this.state
    const {
      availability,
      brand,
      price,
      imageUrl,
      rating,
      description,
      totalReviews,
      title,
      similarProducts,
    } = itemDetails
    return (
      <>
        <div className="product-item-details-container">
          <img src={imageUrl} alt="product" className="product-image" />
          <div className="product-details-container">
            <h1>{title}</h1>
            <p className="span-element">Rs {price}/-</p>
            <div className="total-reviews-rating-container">
              <div className="rating-container">
                <p className="rating">{rating}</p>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                  alt="star"
                  className="star-image"
                />
              </div>
              <p>{totalReviews} Reviews</p>
            </div>
            <p>{description}</p>
            <p>
              <span className="span-element">Available: </span>
              {availability}
            </p>
            <p>
              <span className="span-element">Brand: </span>
              {brand}
            </p>
            <div className="add-to-cart-conatiner">
              <div className="buttons-container">
                <button
                  data-testid="minus"
                  className="increase-decrease-button"
                  onClick={this.decreaseCount}
                >
                  <BsDashSquare />
                </button>
                <p className="count">{itemsCount}</p>
                <button
                  data-testid="plus"
                  className="increase-decrease-button"
                  onClick={this.increaseCount}
                >
                  <BsPlusSquare />
                </button>
              </div>
              <button className="add-to-cart-button">ADD TO CART</button>
            </div>
          </div>
        </div>
        <h1>Similar Products</h1>
        <ul className="similar-products-container">
          {similarProducts.map(eachProduct => (
            <SimilarProductItem
              eachProduct={eachProduct}
              key={eachProduct.id}
            />
          ))}
        </ul>
      </>
    )
  }

  renderLoadingView = () => {
    return (
      <div data-testid="loader">
        <Loader type="ThreeDots" color="#0b69ff" height={80} width={80} />
      </div>
    )
  }

  renderFailureView = () => {
    return (
      <div className="error-image-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
          alt="failure view"
          className="error-view-image"
        />
        <h1>product Not Found</h1>
        <Link to="/products">
          <button className="shopping-button">Continue Shopping</button>
        </Link>
      </div>
    )
  }

  renderProductDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProductDetailsViews()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return 'Failed'
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="container">{this.renderProductDetails()}</div>
      </>
    )
  }
}

export default ProductItemDetails
