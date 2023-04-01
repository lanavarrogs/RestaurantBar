
const Alerta = ({alerta}) => {
  return (
    <div className={`${alerta.error  ? 'from-red-500 to-red-600'  : 'from-sky-400 to-sky-600'  } bg-gradient-to-br text-center p-3 rounded-xl uppercase mt-4 text-white font-bold`}>
      {alerta.msg}
    </div>
  )
}

export default Alerta