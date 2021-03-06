/** @jsx jsx */
import { jsx, Themed, Box, Label, Input, Textarea, Button, Flex, Spinner } from "theme-ui"
import { useState, useRef } from "react"

export default function Form() {
  const [values, setValues] = useState()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const ref = useRef()
  const handleChange = e => {
    const { name, value } = e.target
    setValues({
      ...values,
      [name]: value,
    })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    try {
      const { verso, autor, fuente } = values
      const response = await fetch("/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ verso, autor, fuente }),
      })
      const data = await response.json()
      console.log(data)
      setLoading(false)
      setSuccess(true)
      ref.current.reset()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div sx={{ maxWidth: 640, py: 6, px: 3, mx: "auto" }}>
      <Themed.h1
        sx={{
          mb: 5,
          fontSize: 5,
          fontWeight: 800,
          textAlign: "center",
        }}
      >
        Último aviso
      </Themed.h1>
      <Themed.p
        sx={{
          fontSize: 5,
          fontFamily: "heading",
          textAlign: "justify",
        }}
      >
        Como sabemos que los lectores echarán en falta más de algún verso inolvidable, hemos dejado{" "}
        {/* <del>estas hojas en blanco</del> */} <span sx={{ fontFamily: "body" }}>el siguiente formulario</span> para que los
        anoten y los sumen a una lista que ya imaginamos interminable.
      </Themed.p>
      <Box
        ref={ref}
        as="form"
        sx={{
          variant: "forms.primary",
          position: "relative",
          display: "flex",
          flexDirection: "column",
        }}
        onChange={handleChange}
        onSubmit={handleSubmit}
      >
        <Label htmlFor="autor">Autor</Label>
        <Input type="text" name="autor" id="autor" required />
        <Label htmlFor="fuente">Fuente</Label>
        <Input type="text" name="fuente" id="fuente" required />
        <Label htmlFor="verso">Verso</Label>
        <Textarea name="verso" id="verso" rows={6} required />
        <Flex sx={{ mt: 3, height: "20vh" }}>
          {loading ? (
            <Spinner color="secondary" sx={{ m: "auto" }} />
          ) : success ? (
            <div>
              <Themed.p sx={{ fontFamily: "heading", fontSize: 5 }}>
                Gracias por tu aporte!
                <br />
                Para agregar más versos a la lista <Themed.a onClick={() => setSuccess(false)}>clickea aquí</Themed.a>.
              </Themed.p>
            </div>
          ) : (
            <Button sx={{ mx: "auto", mb: "auto", width: "100%", fontSize: 5, fontFamily: "body" }}>Agregar a la lista</Button>
          )}
        </Flex>
      </Box>
    </div>
  )
}
