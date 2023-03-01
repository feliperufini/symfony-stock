import React from 'react';

const Breadcrumb = ({ title = '', breadcrumbs = ['Home'] }) => {
    (
        <div class="row">
            <div class="col-12">
                <div class="page-title-box">
                    <div class="page-title">
                        <ol class="breadcrumb m-0">
                            {breadcrumbs.map((breadcrumb, i) => {
                                if (i === breadcrumbs.lenght - 1) {
                                    return (
                                        <li key={i} class="breadcrumb-item active">{breadcrumb.title}</li>
                                    )
                                } else {
                                    return (
                                        <li key={i} class="breadcrumb-item"><a href={breadcrumb.url}>{breadcrumb.title}</a></li>
                                    )
                                }
                            })}
                        </ol>
                    </div>
                    <h4 class="page-title-right">{title}</h4>
                </div>
            </div>
        </div>
    )
}

export default Breadcrumb;