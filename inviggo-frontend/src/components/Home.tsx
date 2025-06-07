export const Home = () => {
  return (
    <>
    <h1>Home </h1>
    <h2> Token : {localStorage.getItem('jwtToken')}</h2>
    </>
  )
}
