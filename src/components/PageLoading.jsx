import { Spin } from 'antd'

const PageLoading = ({ spinning, children }) => {
    return (
        <>
            {spinning && (
                <div
                    className="fixed top-0 bottom-0 right-0 left-0 z-50 flex items-center justify-center"
                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
                >
                    <Spin size="large" tip="Loading..." spinning={spinning} />
                </div>
            )}

            {children}
        </>
    )
}

export default PageLoading
