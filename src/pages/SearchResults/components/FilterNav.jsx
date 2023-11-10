import React from 'react'

function FilterNav() {
    return (
        <aside id="filter_nav">
            <div className="filter_top">
                <h2 className="filter_title">Filters</h2>
                <button className="clear_filter_btn">Clear Filters</button>
            </div>
            <div className="filter_wrapper">
                <div className="filter_features">
                    <ul>
                        <li>
                            <details>
                                <summary>
                                    Price
                                </summary>
                                <p>
                                    <ul>
                                        <li>
                                            <input type="checkbox" name="" id="1" />
                                            <label htmlFor="1">1</label>
                                        </li>
                                        <li>
                                            <input type="checkbox" name="" id="2" />
                                            <label htmlFor="2">2</label>
                                        </li>
                                        <li>
                                            <input type="checkbox" name="" id="3" />
                                            <label htmlFor="3">3</label>
                                        </li>
                                        <li>
                                            <input type="checkbox" name="" id="4" />
                                            <label htmlFor="4">4</label>
                                        </li>
                                    </ul>
                                </p>
                            </details>
                        </li>
                        <li>
                            <details>
                                <summary>
                                    Brand
                                </summary>
                                <p>kjkllkd</p>
                            </details>
                        </li>
                        <li>
                            <details>
                                <summary>
                                    Customer Ratings
                                </summary>
                                <p>kjkllkd</p>
                            </details>
                        </li>
                        <li>
                            <details>
                                <summary>
                                    Category
                                </summary>
                                <p>kjkllkd</p>
                            </details>
                        </li>
                    </ul>

                </div>
            </div>
            <div className="filter_bottom">
                <div className="products_count">
                    6416<br />
                    <span>products found</span>
                </div>
                <button className="filter_btn">Apply</button>
            </div>
        </aside>
    )
}

export default FilterNav