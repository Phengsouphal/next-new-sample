import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/EOM.module.css'

export const EOM = ({employee}) => {
    console.log(employee)
  return (
    <div className='page-container'>
        <div className={styles.main}>
            <h1>
                Employee of the Month
            </h1>
            <div className={styles.employeeOfTheMonth}>
                <h3>
                    {employee.name}
                </h3>
                <h6>
                    {employee.position}
                </h6>
                <img src={employee.image} />

                <p>
                    {employee.description}
                </p>
            </div>
        </div>
    </div>
    )
}

export const getServerSideProps = async pageContext => {
    const apiRespones = await fetch (
        'https://my-json-server.typicode.com/portexe/next-news/employeeOfTheMonth',
    )

    const employee = await apiRespones.json();

    return {
        props: {
            employee: employee
        }
    }
}

export default EOM
